import React, { useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou use outro pacote de ícones
import styles from '../../styles/stylesInicio.js';
import NavegacaoBotao from '../../components/NavegacaoBotao.js';

export default function InicioScreen({ navigation }) {
  // Adiciona o botão de menu no header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
          <Ionicons name="menu" size={28} />
        </TouchableOpacity>
      ),
      title: 'Início',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NavegacaoBotao
        titulo="Aprendizado"
        icone="book"
        estilo={styles.button}
        estiloTexto={styles.buttonText}
        onPress={() => navigation.navigate('Aprendizado')}
      />
      <NavegacaoBotao
        titulo="Ambiente"
        icone="home"
        estilo={styles.button}
        estiloTexto={styles.buttonText}
        onPress={() => navigation.navigate('Novo Ambiente')}
      />
    </View>
  );
}
