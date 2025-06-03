import Constants from 'expo-constants';
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        if (token && email) {
          setUsuarioLogado({ email, token });
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuario();
  }, []);

  const Login = async (email, password) => {
    try {
      const HOST = Constants.expoConfig.extra.apiurl;
      const resposta = await fetch(`http://${HOST}:5000/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!resposta.ok) throw new Error('Login inválido');

      const dados = await resposta.json();

      await AsyncStorage.setItem('token', dados.token);
      await AsyncStorage.setItem('email', email);

      setUsuarioLogado({ email: email, token: dados.token });
    } catch (error) {
      throw error;
    }
  };

    const register = async (email, password,name,age,interests) => {
    try {
      const HOST = Constants.expoConfig.extra.apiurl;
      const resposta = await fetch(`http://${HOST}:5000/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,name,age,interests }),
      });
      
      if (!resposta.ok) throw new Error('Erro ao Cadastrar');

      const dados = await resposta.json();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, Login, logout,register, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

