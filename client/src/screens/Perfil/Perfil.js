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
const HOST = '192.169.20.223';
        const resposta = await fetch('http://192.168.15.114:5000/perfil', {
          headers: {
            'Authorization': `Bearer ${usuarioLogado.token}`,
          },
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.message || 'Erro ao buscar dados do usuário');
        }

        setDadosUsuario(dados);
      } catch (erro) {
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
        <Text style={styles.nome}>Erro ao carregar usuário</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FotoPerfil imagem={require('../../../assets/icon.png')} />
      <Text style={styles.nome}>
        Bem-vindo, {dadosUsuario.nome?.split(' ')[0] || dadosUsuario.email}
      </Text>
    </View>
  );
}
