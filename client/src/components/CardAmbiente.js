import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/stylesTelaAudio.js';

const CardAmbiente = ({ conteudo, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    {conteudo.getImagem() && (
      <Image source={conteudo.getImagem()} style={styles.buttonImage} />
    )}
    <Text style={styles.buttonText}>{conteudo.getTitulo()}</Text>
  </TouchableOpacity>
);

export default CardAmbiente;
