import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import FotoPerfil from '../../components/FotoPerfil.js';
import styles from '../../styles/stylesLogin.js';
import FloatingPuzzleBackground from '../../components/PuzzleBackground.js'; // novo import!

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { Login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await Login(email, senha);
      navigation.navigate('MenuLateral');
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao fazer Login');
    }
  };

  return (
    <View style={styles.container}>
      
      <FloatingPuzzleBackground />

      <View style={styles.photoContainer}>
        <FotoPerfil style={styles.photo} imagem={require('../../../icons/profile.jpg')} />
      </View>

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextRegister}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
