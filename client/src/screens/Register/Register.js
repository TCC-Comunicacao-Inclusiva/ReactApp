import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import FotoPerfil from '../../components/FotoPerfil.js';
import styles from '../../styles/stylesLogin.js';
import FloatingPuzzleBackground from '../../components/PuzzleBackground.js';


export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [senha, setSenha] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(email, senha,name,age,interests);
      navigation.navigate('Login'); 
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao fazer Cadastro');
    }
  };

  return (
    <View style={styles.container}>

      <FloatingPuzzleBackground />

      <Text style={styles.title}>Cadastro</Text>
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
       <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
       <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Interesses"
        value={interests}
        onChangeText={setInterests}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
