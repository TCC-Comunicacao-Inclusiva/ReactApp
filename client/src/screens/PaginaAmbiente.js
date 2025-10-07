import React from 'react';
import { View, FlatList, Text } from 'react-native';
import CardItem from '../components/CardItem';
import styles from '../styles/stylesTelaAudio.js'; 
import FloatingPuzzleBackground from '../components/PuzzleBackground.js';


export default function PaginaAmbiente({ route }) {
  const { ambiente } = route.params;

  const renderItem = ({ item }) => {

    const iconMap = {
  'banheiro.png': require('../../icons/banheiro.png'),
  'brincar.png': require('../../icons/brincar.png'),
  'dislike.png': require('../../icons/dislike.png'),
  'exit.png': require('../../icons/exit.png'),
  'fome.png': require('../../icons/fome.png'),
  'like.png': require('../../icons/like.png'),
  'profile.jpg': require('../../icons/profile.jpg'),
};


    const conteudo = {
      titulo: item.titulo,
      imagem: item.icon.startsWith('http')
        ? { uri: item.icon }
        : iconMap[item.icon],
      ambiente: ambiente.nome, 
    };

    return <CardItem conteudo={conteudo} onPress={() => {}} />;
  };

  return (
    <View style={styles.container}>

      <FloatingPuzzleBackground />

      <Text style={styles.title}>{ambiente.nome}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={ambiente.cards}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    </View>
  );
}
