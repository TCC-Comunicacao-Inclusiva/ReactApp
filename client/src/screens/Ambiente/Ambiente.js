import React from 'react';
import { View, FlatList, Text } from 'react-native';
import CardAmbiente from '../../components/CardAmbiente.js';
import Ambiente from '../../models/ConteudoAmbiente.js';
import styles from '../../styles/stylesTelaAudio.js';

  const iconImages = {
  "fome": require('../../../icons/fome.png'),
  "like": require('../../../icons/like.png'),
  "brincar": require('../../../icons/brincar.png'),
  "banheiro": require('../../../icons/banheiro.png'),
  "exit": require('../../../icons/exit.png'),
};
  const ambiente =[
    new Ambiente('Banheiro','',iconImages['banheiro']),
    new Ambiente('Like','',iconImages['like']),
    new Ambiente('Brincar','',iconImages['brincar']),
    new Ambiente('Fome','',iconImages['fome']),
    new Ambiente('Exit','',iconImages['exit']),

  ];

 export default function AmbienteScreen() {
  const renderItem = ({ item }) => <CardAmbiente conteudo={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ambiente</Text>
      <FlatList
        data={ambiente}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

