import * as SecureStore from 'expo-secure-store';

export const saveToasyncStorage = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log('saveToasyncStorage error', error);
  }
};

export const getFromasyncStorage = async (key: string) => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log('getFromasyncStorage error', error);
  }
};
export const clearasyncStorage = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('clearasyncStorage error', error);
  }
};

export const keys = {
  AUTH_TOKEN: 'AUTH_TOKEN',
};
