import { getFromasyncStorage, keys } from '@utils/asyncStorage';
import axios from 'axios';
export const client = axios.create({
  baseURL: 'https://podify-3444ef74d960.herokuapp.com',
});
client.interceptors.request.use(async (config) => {
  const token = await getFromasyncStorage(keys.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
