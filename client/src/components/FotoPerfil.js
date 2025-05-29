import React from 'react';
import { Image } from 'react-native';
import styles from '../styles/stylesPerfil.js';

const FotoPerfil = ({ imagem }) => (
  <Image style={styles.photo} source={imagem} />
);

export default FotoPerfil;
