import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import { autenticarUsuario } from '../../services/authService.js';
import styles from '../../styles/stylesLogin.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useContext(AuthContext);

const handleLogin = async () => {
  try {
    const response = await fetch('http://192.168.15.114:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: senha })  // o nome da chave deve bater com o backend
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }

    const data = await response.json();

    if (data && data.token) {
      login({ email, token: data.token }); // Atualiza o contexto global com token se quiser
      navigation.navigate('Inicio');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  } catch (error) {
    Alert.alert('Erro', error.message);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
