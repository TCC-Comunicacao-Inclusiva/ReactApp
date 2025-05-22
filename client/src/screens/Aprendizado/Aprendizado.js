import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ConteudoAprendizado from '../../models/ConteudoAprendizado.js';
import CardAprendizado from '../../components/CardAprendizado.js';
import styles from '../../styles/stylesTelaAudio.js';

// Imagens dos ícones
const buttonImages = {
  "Ir Embora": require('../../../icons/exit.png'),
  "Comer": require('../../../icons/fome.png'),
  "Quero ir ao Banheiro": require('../../../icons/banheiro.png'),
  "Gostei": require('../../../icons/like.png'),
  "Não Gostei": require('../../../icons/dislike.png'),
  "Brincar": require('../../../icons/brincar.png')
};

// Dados com imagens
const conteudos = [
  new ConteudoAprendizado('Ir Embora', '', buttonImages['Ir Embora']),
  new ConteudoAprendizado('Comer', '', buttonImages['Comer']),
  new ConteudoAprendizado('Quero ir ao Banheiro', '', buttonImages['Quero ir ao Banheiro']),
  new ConteudoAprendizado('Gostei', '', buttonImages['Gostei']),
  new ConteudoAprendizado('Não Gostei', '', buttonImages['Não Gostei']),
  new ConteudoAprendizado('Brincar', '', buttonImages['Brincar']),
];

export default function AprendizadoScreen() {
  const renderItem = ({ item }) => <CardAprendizado conteudo={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aprendizado</Text>
      <FlatList
        data={conteudos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

