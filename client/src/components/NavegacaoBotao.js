import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavegacaoBotao = ({ titulo, icone, onPress, estilo, estiloTexto }) => (
  <TouchableOpacity style={estilo} onPress={onPress}>
    <Text style={estiloTexto}>{titulo}</Text>
    <Ionicons name={icone} size={24} color="black" />
  </TouchableOpacity>
);

export default NavegacaoBotao;
