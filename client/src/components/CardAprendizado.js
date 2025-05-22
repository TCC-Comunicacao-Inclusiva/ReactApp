import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/stylesTelaAudio.js';

const CardAprendizado = ({ conteudo }) => (
  <View style={styles.card}>
    <Text style={styles.titulo}>{conteudo.titulo}</Text>
    <Text style={styles.descricao}>{conteudo.getResumo()}</Text>
  </View>
);

export default CardAprendizado;
