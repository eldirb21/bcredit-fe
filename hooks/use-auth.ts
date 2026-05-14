import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
      setIsLoading(false);
    });
  }, []);

  const saveToken = async (newToken: string) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const removeToken = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return { token, isLoading, saveToken, removeToken };
}