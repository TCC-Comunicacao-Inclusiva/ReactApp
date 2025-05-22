import React from 'react';
import { View } from 'react-native';
import ConteudoAprendizado from '../../models/ConteudoAprendizado.js';
import CardAprendizado from '../../components/CardAprendizado.js';
import styles from '../../styles/stylesTelaAudio.js';

export default function AprendizadoScreen() {
  const conteudos = [
    new ConteudoAprendizado('Alfabeto', 'Aprenda as letras do alfabeto com sons e imagens.'),
    new ConteudoAprendizado('Números', 'Conte de 1 a 10 com atividades interativas.')
  ];

  return (
    <View style={styles.container}>
      {conteudos.map((conteudo, index) => (
        <CardAprendizado key={index} conteudo={conteudo} />
      ))}
    </View>
  );
}
