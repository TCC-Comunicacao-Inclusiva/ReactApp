// src/screens/PaginaAmbiente.js
import React, { useMemo, useLayoutEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DrawerActions, useRoute, useNavigation } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext.js';
import CardItem from '../components/CardItem';
import styles from '../styles/stylesTelaAudio.js';
import FloatingPuzzleBackground from '../components/PuzzleBackground.js';
import { imageMap, audioMap } from '../../icons/manifest';

const baseName = (file) => (file || '').replace(/\.[^/.]+$/, '');

export default function PaginaAmbiente() {
  const route = useRoute();
  const navigation = useNavigation();
  const { usuarioLogado } = React.useContext(AuthContext);
  const { ambiente } = route.params; // { id, nome, cards }

  const [editando, setEditando] = useState(false);
  const [ordem, setOrdem] = useState(() =>
    (ambiente?.cards ?? []).map((c, i) => ({ ...c, _pos: i }))
  );

  // quando o ambiente chegar/atualizar, reseta ordem
  React.useEffect(() => {
    setOrdem((ambiente?.cards ?? []).map((c, i) => ({ ...c, _pos: i })));
  }, [ambiente?.cards]);

  const audioLowerKeyMap = useMemo(() => {
    const m = new Map();
    Object.keys(audioMap).forEach((k) => m.set(k.toLowerCase(), k));
    return m;
  }, []);

  const resolveAudioKey = (item) => {
    if (item?.audio && audioMap[item.audio]) return item.audio;
    if (item?.icon && !String(item.icon).startsWith('http')) {
      const candidate = baseName(item.icon).toLowerCase();
      const found = audioLowerKeyMap.get(candidate);
      if (found) return found;
    }
    return null;
  };

  const HOST = Constants.expoConfig?.extra?.apiurl;

  const moveItem = useCallback((index, dir) => {
    setOrdem((prev) => {
      const nova = [...prev];
      const alvo = index + dir;
      if (alvo < 0 || alvo >= nova.length) return prev;
      const tmp = nova[index];
      nova[index] = nova[alvo];
      nova[alvo] = tmp;
      return nova;
    });
  }, []);

  const onSalvar = useCallback(async () => {
    try {
      if (!HOST) {
        Alert.alert('Erro', 'HOST não configurado em expoConfig.extra.apiurl');
        return;
      }
      if (!usuarioLogado?.token) {
        Alert.alert('Erro', 'Token ausente para autenticação.');
        return;
      }
      if (!ambiente?.id) {
        Alert.alert('Erro', 'Ambiente sem ID.');
        return;
      }

      // monta a nova ordem: preferimos enviar id (quando existir) + titulo + newId
      const newCardsIds = ordem.map((card, idx) => ({
        id: card?.id ?? null,
        titulo: card?.titulo ?? `Card ${idx + 1}`,
        newId: idx + 1,
      }));

      const resp = await fetch(`http://${HOST}:5000/newCardsIds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usuarioLogado.token}`,
        },
        body: JSON.stringify({
          ambienteId: ambiente.id,
          newCardsIds,
        }),
      });

      if (!resp.ok) {
        const texto = await resp.text().catch(() => '');
        throw new Error(`Falha ao salvar (${resp.status}): ${texto}`);
      }

      // usa a resposta do backend (já normalizada e ordenada)
      const data = await resp.json().catch(() => null);
      if (data?.ok && data?.ambiente?.cards) {
        const cardsOrdenados = [...data.ambiente.cards].sort(
          (a, b) => (a.id ?? 0) - (b.id ?? 0)
        );
        // atualiza a lista visível
        setOrdem(cardsOrdenados.map((c, i) => ({ ...c, _pos: i })));
        // atualiza os params da rota para evitar "voltar com o cache antigo"
        navigation.setParams({ ambiente: data.ambiente });
      } else {
        // fallback: mantém ids locais conforme enviado
        const mapTituloToNewId = new Map(newCardsIds.map((x) => [x.titulo, x.newId]));
        setOrdem((prev) =>
          prev.map((c, i) => ({
            ...c,
            id: mapTituloToNewId.get(c.titulo) ?? c.id ?? i + 1,
            _pos: i,
          }))
        );
      }

      Alert.alert('Pronto!', 'Ordem dos cards salva.');
      setEditando(false);
    } catch (e) {
      Alert.alert('Erro ao salvar', e?.message ?? 'Tente novamente.');
    }
  }, [ordem, usuarioLogado, HOST, ambiente?.id, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ambiente?.nome ?? 'Ambiente',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <Ionicons
          name="menu"
          size={28}
          onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () =>
        editando ? (
          <TouchableOpacity
            onPress={onSalvar}
            style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="save-outline" size={22} style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 16 }}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEditando(true)}
            style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="create-outline" size={22} style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 16 }}>Editar</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, ambiente?.nome, editando, onSalvar]);

  const renderCard = ({ item }) => {
    const isRemoteIcon = item.icon && String(item.icon).startsWith('http');
    const conteudo = {
      titulo: item.titulo,
      imagem: isRemoteIcon ? { uri: item.icon } : imageMap[item.icon],
      ambiente: ambiente.nome,
      audio: (() => {
        const key = resolveAudioKey(item);
        return key ? audioMap[key] : null;
      })(),
      audioKey: resolveAudioKey(item) || undefined,
    };
    return <CardItem conteudo={conteudo} onPress={() => {}} />;
  };

  const LinhaEdicao = ({ item, index, total }) => (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
        width: '100%',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="reorder-two-outline" size={22} style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>{item?.titulo || 'Sem título'}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          accessibilityLabel="Mover para cima"
          onPress={() => moveItem(index, -1)}
          disabled={index === 0}
          style={{ opacity: index === 0 ? 0.3 : 1 }}
        >
          <Ionicons name="chevron-up-circle-outline" size={26} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Mover para baixo"
          onPress={() => moveItem(index, +1)}
          disabled={index === total - 1}
          style={{ opacity: index === total - 1 ? 0.3 : 1 }}
        >
          <Ionicons name="chevron-down-circle-outline" size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FloatingPuzzleBackground />
      <Text style={styles.title}>{ambiente.nome}</Text>

      {!editando ? (
        <View style={styles.listContainer}>
          <FlatList
            data={ordem}
            renderItem={renderCard}
            keyExtractor={(item, index) => String(item?.id ?? index)}
            numColumns={3}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, width: '100%' }}>
          {ordem?.length ? (
            ordem.map((c, idx) => (
              <LinhaEdicao
                key={String(c?.id ?? c?.titulo ?? idx)}
                item={c}
                index={idx}
                total={ordem.length}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum card para editar</Text>
          )}
          <View style={{ height: 24 }} />
        </ScrollView>
      )}
    </View>
  );
}
