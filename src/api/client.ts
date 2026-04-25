import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_JOTFORM_BASE_URL as string,
});

apiClient.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_JOTFORM_API_KEY as string;

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('[JotForm] VITE_JOTFORM_API_KEY is not set in .env.local');
  }

  config.params = { ...config.params, apiKey };
  return config;
});

export default apiClient;
