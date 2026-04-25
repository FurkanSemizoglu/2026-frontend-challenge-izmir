import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav
      style={{ background: 'var(--podo-navy)' }}
      className="sticky top-0 z-50 w-full border-b border-white/10"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0099ff]">
            {/* Podo paw icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <circle cx="8" cy="6" r="2" />
              <circle cx="16" cy="6" r="2" />
              <circle cx="5" cy="11" r="1.5" />
              <circle cx="19" cy="11" r="1.5" />
              <ellipse cx="12" cy="16" rx="5" ry="4" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Podo<span style={{ color: 'var(--podo-orange)' }}>'s</span> Case Files
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition no-underline ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/case"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition no-underline ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Case Board
          </NavLink>
          <NavLink
            to="/suspects"
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 text-sm font-medium transition no-underline ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Suspects
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
