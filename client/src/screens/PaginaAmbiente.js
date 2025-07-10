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


    // Adaptando item para o formato esperado por CardItem
    const conteudo = {
      getTitulo: () => item.titulo,
      getImagem: () =>
      item.icon.startsWith('http') // Se for URL (web)
      ? { uri: item.icon }
      : iconMap[item.icon] // Local
   // Local
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
          numColumns={3} // ← 3 colunas para melhor grid com seu estilo
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    </View>
  );
}
