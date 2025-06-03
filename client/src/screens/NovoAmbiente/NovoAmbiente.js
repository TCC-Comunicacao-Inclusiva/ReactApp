import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from '../../context/AuthContext.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import stylesNovoAmbiente from '../../styles/stylesNovoAmbiente.js';

const icones = [
  require('../../../icons/banheiro.png'),
  require('../../../icons/brincar.png'),
  require('../../../icons/dislike.png'),
  require('../../../icons/exit.png'),
  require('../../../icons/fome.png'),
  require('../../../icons/like.png'),
  require('../../../icons/profile.jpg'),
];

const nomesIcones = [
  'banheiro.png',
  'brincar.png',
  'dislike.png',
  'exit.png',
  'fome.png',
  'like.png',
  'profile.jpg',
];

export default function NovoAmbienteScreen() {

  const navigation = useNavigation();
  const route = useRoute();
  const { usuarioLogado } = useContext(AuthContext);

  const [nomeAmbiente, setNomeAmbiente] = useState('');
  const [ambienteCriado, setAmbienteCriado] = useState(false);
  const [nomeItem, setNomeItem] = useState('');
  const [iconeSelecionado, setIconeSelecionado] = useState(null);
  const [itens, setItens] = useState([]);

  const handleCriarAmbiente = () => {
    if (nomeAmbiente.trim() !== '') {
      setAmbienteCriado(true);
    }
  };

  const resetarTela = () => {
  setNomeAmbiente('');
  setAmbienteCriado(false);
  setNomeItem('');
  setIconeSelecionado(null);
  setItens([]);
};


  const adicionarItem = () => {
    if (!nomeItem || iconeSelecionado === null) return;

    const novoItem = { nome: nomeItem, icone: iconeSelecionado };
    setItens([...itens, novoItem]);
    setNomeItem('');
    setIconeSelecionado(null);
  };

  const salvarAmbiente = async () => {
    if (!nomeAmbiente || itens.length === 0) {
      alert('Preencha o nome do ambiente e adicione ao menos um item.');
      return;
    }

    const ambiente = {
      nome: nomeAmbiente,
      cards: itens.map(item => ({
        titulo: item.nome,
        resumo: '',
        icon: nomesIcones[item.icone],
      })),
    };

    try {
      const HOST = Constants.expoConfig.extra.apiurl;
      const response = await fetch(`http://${HOST}:5000/createambiente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usuarioLogado.token}`,
        },
        body: JSON.stringify(ambiente),
      });

      if (response.ok) {
        resetarTela();
      } else {
        console.error('Erro na resposta do servidor:', data);
  }
    } catch (error) {
      console.error('Erro ao enviar ambiente:', error);
    }
  };

  return (
    <View style={stylesNovoAmbiente.container}>
      {!ambienteCriado ? (
        <>
          <Text style={stylesNovoAmbiente.title}>Novo Ambiente</Text>
          <TextInput
            style={stylesNovoAmbiente.input}
            placeholder="Nome do Ambiente"
            value={nomeAmbiente}
            onChangeText={setNomeAmbiente}
          />
          <TouchableOpacity
            style={stylesNovoAmbiente.button}
            onPress={handleCriarAmbiente}
          >
            <Text style={stylesNovoAmbiente.buttonText}>Criar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={stylesNovoAmbiente.title}>{nomeAmbiente}</Text>

          <View style={stylesNovoAmbiente.containerCriacao}>
            <View style={stylesNovoAmbiente.itemRow}>
              <TextInput
                style={stylesNovoAmbiente.itemInput}
                placeholder="Nome do Item"
                value={nomeItem}
                onChangeText={setNomeItem}
              />
              <TouchableOpacity
                style={stylesNovoAmbiente.addButton}
                onPress={adicionarItem}
              >
                <Text style={stylesNovoAmbiente.buttonText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={stylesNovoAmbiente.iconesContainer}>
              {icones.map((icone, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setIconeSelecionado(index)}
                >
                  <Image
                    source={icone}
                    style={[
                      stylesNovoAmbiente.icone,
                      iconeSelecionado === index &&
                        stylesNovoAmbiente.iconeSelecionado,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <FlatList
              data={itens}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={stylesNovoAmbiente.listaItem}>
                  <Image
                    source={icones[item.icone]}
                    style={stylesNovoAmbiente.listaIcone}
                  />
                  <Text>{item.nome}</Text>
                </View>
              )}
              style={{ width: '100%' }}
            />
          </View>

          <TouchableOpacity
            style={stylesNovoAmbiente.button}
            onPress={salvarAmbiente}
          >
            <Text style={stylesNovoAmbiente.buttonText}>Criar Ambiente</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
