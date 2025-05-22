import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/stylesAmbiente.js';

const CardAmbiente = ({ ambiente }) => (
  <View style={styles.container}>
    <Text style={styles.titulo}>{ambiente.getNomeFormatado()}</Text>
    <Image style={styles.imagem} source={ambiente.getIcone()} />
  </View>
);

export default CardAmbiente;
