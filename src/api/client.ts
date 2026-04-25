import axios from 'axios';

const apiKey = import.meta.env.VITE_JOTFORM_API_KEY as string | undefined;
const baseURL = import.meta.env.VITE_JOTFORM_BASE_URL as string | undefined;

if (!apiKey || apiKey === 'your_api_key_here') {
  console.warn('[JotForm] VITE_JOTFORM_API_KEY is not set in .env.local');
}

export const apiClient = axios.create({
  baseURL,
  params: { apiKey },
});
