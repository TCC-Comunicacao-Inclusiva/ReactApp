import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import stylesAmbiente from '../styles/stylesAmbiente';

const iconImages = {
  fome: require('../icons/fome.png'),
  like: require('../icons/like.png'),
  brincar: require('../icons/brincar.png'),
  banheiro: require('../icons/banheiro.png'),
  exit: require('../icons/exit.png'),
};

export default function AmbienteScreen() {
  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const addButton = () => {
    if (newTitle.trim() !== '' && selectedIcon) {
      const newButton = { id: String(data.length + 1), title: newTitle, icon: selectedIcon };
      setData([...data, newButton]);
      setNewTitle('');
      setSelectedIcon(null);
      setShowIconPicker(false);
    }
  };

  return (
    <View style={stylesAmbiente.container}>
      <Text style={stylesAmbiente.title}>Novo Ambiente</Text>

      {!showIconPicker && (
        <TouchableOpacity style={stylesAmbiente.addMainButton} onPress={() => setShowIconPicker(true)}>
          <Text style={stylesAmbiente.addMainButtonText}>+ Adicionar botão</Text>
        </TouchableOpacity>
      )}

      {showIconPicker && (
        <>
          <TextInput
            style={stylesAmbiente.input}
            placeholder="Nome da novo botão..."
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <View style={stylesAmbiente.iconPicker}>
            {Object.keys(iconImages).map((key) => (
              <TouchableOpacity key={key} onPress={() => setSelectedIcon(iconImages[key])}>
                <Image source={iconImages[key]} style={stylesAmbiente.iconPreview} />
              </TouchableOpacity>
            ))}
          </View>

          
          {selectedIcon && (
            <Image source={selectedIcon} style={stylesAmbiente.selectedImage} />
          )}

          <TouchableOpacity style={stylesAmbiente.addButton} onPress={addButton}>
            <Text style={stylesAmbiente.addButtonText}>Criar Tela</Text>
          </TouchableOpacity>
        </>
      )}

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={stylesAmbiente.button}>
            <Image source={item.icon} style={stylesAmbiente.buttonImage} />
            <Text style={stylesAmbiente.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }} 
      />
    </View>
  );
}
