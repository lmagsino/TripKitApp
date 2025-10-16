import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINTS } from '../constants/config';

export const signup = async (name, email, password, passwordConfirmation) => {
  try {
    const response = await api.post(ENDPOINTS.SIGNUP, {
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    });
    
    // Save token
    await AsyncStorage.setItem('authToken', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.errors || ['Signup failed'] 
    };
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, {
      email,
      password,
    });
    
    // Save token
    await AsyncStorage.setItem('authToken', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.errors || ['Login failed'] 
    };
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('user');
};

export const getStoredToken = async () => {
  return await AsyncStorage.getItem('authToken');
};