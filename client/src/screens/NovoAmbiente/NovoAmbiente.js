import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from '../../context/AuthContext.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/stylesNovoAmbiente.js';
import FloatingPuzzleBackground from '../../components/PuzzleBackground.js';
import { imageMap, audioMap } from '../../../icons/manifest';

const baseName = (file) => file.replace(/\.[^/.]+$/, '');

export default function NovoAmbienteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { usuarioLogado } = useContext(AuthContext);

  const nomesIcones = useMemo(() => Object.keys(imageMap), []);
  const nomesAudios = useMemo(() => Object.keys(audioMap), []);
  const audioLowerKeyMap = useMemo(() => {
    const m = new Map();
    for (const k of nomesAudios) m.set(k.toLowerCase(), k);
    return m;
  }, [nomesAudios]);

  const [nomeAmbiente, setNomeAmbiente] = useState('');
  const [ambienteCriado, setAmbienteCriado] = useState(false);
  const [nomeItem, setNomeItem] = useState('');
  const [iconeSelecionado, setIconeSelecionado] = useState(null);
  const [audioVinculado, setAudioVinculado] = useState(null);
  const [itens, setItens] = useState([]);

  const handleCriarAmbiente = () => {
    if (nomeAmbiente.trim() !== '') setAmbienteCriado(true);
  };

  const resetarTela = () => {
    setNomeAmbiente('');
    setAmbienteCriado(false);
    setNomeItem('');
    setIconeSelecionado(null);
    setAudioVinculado(null);
    setItens([]);
  };

  const onSelecionarIcone = (nomeArquivo) => {
    setIconeSelecionado(nomeArquivo);
    const candidato = baseName(nomeArquivo).toLowerCase();
    const audioKey = audioLowerKeyMap.get(candidato) || null;
    setAudioVinculado(audioKey);
  };

  const adicionarItem = () => {
    if (!nomeItem || !iconeSelecionado) return;
    const candidato = baseName(iconeSelecionado).toLowerCase();
    const audioKey = audioLowerKeyMap.get(candidato) || null;
    if (!audioKey) {
      alert(`Não encontrei áudio com o mesmo nome de "${iconeSelecionado}".`);
      return;
    }
    const novoItem = { nome: nomeItem, icone: iconeSelecionado, audio: audioKey };
    setItens((prev) => [...prev, novoItem]);
    setNomeItem('');
    setIconeSelecionado(null);
    setAudioVinculado(null);
  };

  const salvarAmbiente = async () => {
    if (!nomeAmbiente || itens.length === 0) {
      alert('Preencha o nome do ambiente e adicione ao menos um item.');
      return;
    }
    const ambiente = {
      nome: nomeAmbiente,
      cards: itens.map((item) => ({
        titulo: item.nome,
        resumo: '',
        icon: item.icone,
        audio: item.audio,
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
      if (!response.ok) {
        alert('Erro ao criar ambiente.');
        return;
      }
      resetarTela();
      alert('Ambiente criado com sucesso!');
    } catch {
      alert('Falha de rede ao criar ambiente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.pageContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <FloatingPuzzleBackground />
            {!ambienteCriado ? (
              <>
                <Text style={styles.title}>Novo Ambiente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nome do Ambiente"
                  value={nomeAmbiente}
                  onChangeText={setNomeAmbiente}
                />
                <TouchableOpacity style={styles.button} onPress={handleCriarAmbiente}>
                  <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>{nomeAmbiente}</Text>

                <View style={styles.scrollArea}>
                  <View style={styles.itemRow}>
                    <TextInput
                      style={styles.itemInput}
                      placeholder="Nome do Item"
                      value={nomeItem}
                      onChangeText={setNomeItem}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={adicionarItem}>
                      <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{ marginBottom: 6, fontWeight: '600', width: '100%' }}>
                    Selecione um ícone
                  </Text>

                  <FlatList
                    data={nomesIcones}
                    keyExtractor={(item) => item}
                    numColumns={4}
                    style={styles.listaIcones}
                    showsVerticalScrollIndicator
                    nestedScrollEnabled
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => onSelecionarIcone(item)}>
                        <Image
                          source={imageMap[item]}
                          style={[
                            styles.icone,
                            iconeSelecionado === item && styles.iconeSelecionado,
                          ]}
                        />
                      </TouchableOpacity>
                    )}
                  />

                  {iconeSelecionado && (
                    <Text style={{ marginVertical: 6 }}>
                      {audioVinculado ? (
                        <>
                          Áudio vinculado: <Text style={{ fontWeight: '600' }}>{audioVinculado}</Text>
                        </>
                      ) : (
                        <Text style={{ color: '#e67e22' }}>
                          ⚠ Sem áudio correspondente ({baseName(iconeSelecionado)})
                        </Text>
                      )}
                    </Text>
                  )}

                  <FlatList
                    data={itens}
                    keyExtractor={(_, index) => index.toString()}
                    style={styles.listaItens}
                    showsVerticalScrollIndicator
                    nestedScrollEnabled
                    renderItem={({ item }) => (
                      <View style={styles.listaItem}>
                        <Image source={imageMap[item.icone]} style={styles.listaIcone} />
                        <View style={{ marginLeft: 8 }}>
                          <Text>{item.nome}</Text>
                          <Text style={{ opacity: 0.7, fontSize: 12 }}>
                            Ícone: {item.icone} • Áudio: {item.audio}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>

                <TouchableOpacity style={styles.botaoFixo} onPress={salvarAmbiente}>
                  <Text style={styles.buttonText}>Criar Ambiente</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={{ height: 32 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
