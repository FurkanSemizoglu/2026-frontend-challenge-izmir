import axios, { type AxiosError } from 'axios';

const apiKey = import.meta.env.VITE_JOTFORM_API_KEY as string | undefined;
const baseURL = import.meta.env.VITE_JOTFORM_BASE_URL as string | undefined;

if (!apiKey || apiKey === 'your_api_key_here') {
  console.warn('[JotForm] VITE_JOTFORM_API_KEY is not set in .env.local');
}

export const apiClient = axios.create({
  baseURL,
  params: { apiKey },
  timeout: 30_000,
});

apiClient.interceptors.response.use(
  (response) => {
    const { responseCode, message } = response.data ?? {};
    if (responseCode && Number(responseCode) !== 200) {
      return Promise.reject(new Error(message || 'API isteği başarısız oldu.'));
    }
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(
        new Error('Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.'),
      );
    }

    const status = error.response.status;
    const messages: Record<number, string> = {
      401: 'API anahtarı geçersiz veya eksik.',
      403: 'Bu kaynağa erişim yetkiniz yok.',
      404: 'İstenen kaynak bulunamadı.',
      429: 'Çok fazla istek gönderildi, biraz bekleyin.',
    };

    return Promise.reject(
      new Error(messages[status] || `Bir hata oluştu (${status}).`),
    );
  },
);
