import Constants from 'expo-constants';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext.js';
import styles from '../../styles/stylesPerfil.js';
import FotoPerfil from '../../components/FotoPerfil.js';

export default function PerfilScreen() {
  const { usuarioLogado } = useContext(AuthContext);
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      if (!usuarioLogado || !usuarioLogado.token) {
        setCarregando(false);
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      try {
        const HOST = Constants.expoConfig.extra.apiurl;
        const resposta = await fetch(`http://${HOST}:5000/perfil`, {
          headers: {
            Authorization: `Bearer ${usuarioLogado.token}`,
          },
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.message || 'Erro ao buscar dados do usuário');
        }

        setDadosUsuario(dados.perfil);
      } catch (erro) {
        console.error('Erro no carregamento do perfil:', erro);
        Alert.alert('Erro', erro.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosUsuario();
  }, [usuarioLogado]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!dadosUsuario) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Erro ao carregar usuário</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <FotoPerfil style={styles.photo} imagem={require('../../../icons/profile.jpg')} />
      </View>

      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
        Bem-vindo, {dadosUsuario.name?.split(' ')[0]}
      </Text>

      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{dadosUsuario.email}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Idade:</Text>
        <Text style={styles.infoText}>{dadosUsuario.age}</Text>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoLabel}>Interesses:</Text>
        <Text style={styles.infoText}>{dadosUsuario.interests}</Text>
      </View>
    </View>
  );
}
