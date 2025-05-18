import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import stylesAprendizado from '../styles/stylesTelaAudio';

// Imagens para os botões principais
const buttonImages = {
  "Ir Embora": require('../icons/exit.png'),
  "Comer": require('../icons/fome.png'),
  "Quero ir ao Banheiro": require('../icons/banheiro.png'),
  "Gostei": require('../icons/like.png'),
  "Não Gostei": require('../icons/dislike.png'),
  "Brincar": require('../icons/brincar.png')
};

const data = [
  { id: '1', title: 'Ir Embora' },
  { id: '2', title: 'Comer' },
  { id: '3', title: 'Quero ir ao Banheiro' },
  { id: '4', title: 'Gostei' },
  { id: '5', title: 'Não Gostei' },
  { id: '6', title: 'Brincar' },
  { id: '7', title: '' },
  { id: '8', title: '' },
  { id: '9', title: '' },
];

export default function AprendizadoScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={stylesAprendizado.button}>
      {buttonImages[item.title] && (
        <Image source={buttonImages[item.title]} style={stylesAprendizado.buttonImage} />
      )}
      <Text style={stylesAprendizado.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={stylesAprendizado.container}>
      <Text style={stylesAprendizado.title}>Apredizado</Text>

      <View style={stylesAprendizado.listContainer}>
     <FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  numColumns={3} 
  columnWrapperStyle={{ justifyContent: 'space-around' }} 
/>
      </View>
    </View>
  );
}
