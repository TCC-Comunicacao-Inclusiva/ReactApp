import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import styles from '../../styles/stylesPerfil.js';
import FotoPerfil from '../../components/FotoPerfil.js';
import Usuario from '../../models/Usuario.js';

export default function PerfilScreen() {
  const { usuarioLogado } = useContext(AuthContext);
  const usuario = new Usuario(usuarioLogado?.email || '', ''); // senha não é usada aqui

  return (
    <View style={styles.container}>
      <FotoPerfil imagem={require('../../../assets/icon.png')} />
      <Text style={styles.nome}>
        {usuario.email ? `Bem-vindo, ${usuario.getPrimeiroNome()}` : "Usuário"}
      </Text>
    </View>
  );
}
