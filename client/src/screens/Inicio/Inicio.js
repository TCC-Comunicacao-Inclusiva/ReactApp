import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/stylesInicio.js';
import NavegacaoBotao from '../../components/NavegacaoBotao.js';

export default function InicioScreen({ navigation }) {
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
        titulo="Perfil"
        icone="person"
        estilo={styles.button}
        estiloTexto={styles.buttonText}
        onPress={() => navigation.navigate('Perfil')}
      />
      <NavegacaoBotao
        titulo="Ambiente"
        icone="home"
        estilo={styles.button}
        estiloTexto={styles.buttonText}
        onPress={() => navigation.navigate('Ambiente')}
      />
    </View>
  );
}
