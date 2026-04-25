import { useState } from 'react';
import type { FormSubmission } from '../../types/jotform';
import { formatRelative } from '../../utils/date';
import {
  groupConversations,
  parseMessages,
  type Conversation,
  type ParsedMessage,
} from '../../utils/messages';

interface ConversationBoardProps {
  submissions: FormSubmission[];
}

export function ConversationBoard({ submissions }: ConversationBoardProps) {
  const messages = parseMessages(submissions);
  const conversations = groupConversations(messages);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  if (conversations.length === 0) return null;

  const active = conversations.find(
    (c) => convKey(c) === activeKey,
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <ConversationList
        conversations={conversations}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
      <ChatPanel conversation={active} />
    </div>
  );
}

function convKey(c: Conversation) {
  return c.participants.sort().join('↔');
}

function ConversationList({
  conversations,
  activeKey,
  onSelect,
}: {
  conversations: Conversation[];
  activeKey: string | null;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 lg:w-80 lg:shrink-0">
      <h3
        className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
        style={{ color: 'var(--podo-orange)' }}
      >
        <span>📡</span> Intercepted Channels ({conversations.length})
      </h3>

      <div className="flex flex-col gap-1.5">
        {conversations.map((conv) => {
          const key = convKey(conv);
          const isActive = key === activeKey;
          const last = conv.messages[conv.messages.length - 1];

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                isActive
                  ? 'border-(--podo-orange) bg-white shadow-md ring-1 ring-(--podo-orange)/30'
                  : 'border-(--border) bg-white/80 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-orange-100 to-amber-50 text-lg">
                ✉️
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold" style={{ color: 'var(--podo-navy)' }}>
                  {conv.participants[0]} ↔ {conv.participants[1]}
                </p>
                <p className="mt-0.5 truncate text-xs text-(--muted)">
                  {last.body.slice(0, 60)}{last.body.length > 60 ? '…' : ''}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="whitespace-nowrap text-[10px] text-(--muted)">
                  {formatRelative(last.date)}
                </span>
                <span
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
                  style={{ background: 'var(--podo-orange)' }}
                >
                  {conv.messages.length}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatPanel({ conversation }: { conversation?: Conversation }) {
  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-(--border) bg-white/60 px-8 py-16 text-center">
        <span className="text-4xl">📨</span>
        <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--podo-navy)' }}>
          Select a channel to view intercepted messages
        </p>
        <p className="mt-1 text-xs text-(--muted)">
          Pick a conversation from the left to start reading
        </p>
      </div>
    );
  }

  const [personA, personB] = conversation.participants;

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-(--border) bg-white shadow-md">
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: 'var(--podo-navy)' }}
      >
        <div className="flex -space-x-2">
          <Avatar name={personA} index={0} />
          <Avatar name={personB} index={1} />
        </div>
        <div>
          <p className="text-sm font-bold text-white">
            {personA} & {personB}
          </p>
          <p className="text-[11px] text-white/50">
            {conversation.messages.length} intercepted message{conversation.messages.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5" style={{ maxHeight: 520 }}>
        {conversation.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isSender={msg.sender === personA}
          />
        ))}
      </div>
    </div>
  );
}

const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-orange-400 to-orange-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br text-[11px] font-bold text-white ring-2 ring-white ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}
    >
      {initials || '?'}
    </div>
  );
}

function ChatBubble({ message, isSender }: { message: ParsedMessage; isSender: boolean }) {
  return (
    <div className={`flex ${isSender ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[75%] ${isSender ? '' : 'text-right'}`}>
        <p
          className={`mb-1 text-[11px] font-semibold ${isSender ? '' : 'text-right'}`}
          style={{ color: isSender ? 'var(--podo-blue)' : 'var(--podo-orange)' }}
        >
          {message.sender} → {message.receiver}
        </p>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isSender
              ? 'rounded-bl-sm bg-blue-50 text-(--text-h)'
              : 'rounded-br-sm bg-orange-50 text-(--text-h)'
          }`}
        >
          {message.body}
        </div>
        {message.extras.length > 0 && (
          <div className={`mt-1.5 flex flex-wrap gap-2 ${isSender ? '' : 'justify-end'}`}>
            {message.extras.map((e) => (
              <span
                key={e.label}
                className="rounded-full bg-(--code-bg) px-2.5 py-0.5 text-[10px] font-medium text-(--muted)"
              >
                {e.label}: {e.value}
              </span>
            ))}
          </div>
        )}
        <p className={`mt-1 text-[10px] text-(--muted) ${isSender ? '' : 'text-right'}`}>
          {formatRelative(message.date)}
        </p>
      </div>
    </div>
  );
}
