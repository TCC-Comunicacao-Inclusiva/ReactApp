// src/screens/Inicio/Inicio.js
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { DrawerActions } from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext.js';
import NavegacaoBotao from '../../components/NavegacaoBotao.js';
import styles from '../../styles/stylesInicio.js';
import FloatingPuzzleBackground from '../../components/PuzzleBackground.js';
import { getAmbRouteName } from '../../utils/nav';

const InicioScreen = ({ navigation, ambientes = [] }) => {
  const { usuarioLogado } = React.useContext(AuthContext);

  const [editando, setEditando] = useState(false);
  const [ordem, setOrdem] = useState(
    (ambientes ?? []).map((a, i) => ({ ...a, _pos: i }))
  );

  const HOST = Constants.expoConfig?.extra?.apiurl;

  // mantém ordem em sincronia quando 'ambientes' muda
  React.useEffect(() => {
    setOrdem((ambientes ?? []).map((a, i) => ({ ...a, _pos: i })));
  }, [ambientes]);

  const moveItem = useCallback((index, direcao) => {
    setOrdem((prev) => {
      const nova = [...prev];
      const alvo = index + direcao;
      if (alvo < 0 || alvo >= nova.length) return prev;
      const tmp = nova[index];
      nova[index] = nova[alvo];
      nova[alvo] = tmp;
      return nova;
    });
  }, []);

  const onToggleEditar = useCallback(() => {
    setEditando((e) => !e);
  }, []);

  const onSalvar = useCallback(async () => {
    try {
      const newAmbientesIds = ordem.map((amb, idx) => ({
        nome: amb?.nome ?? `Ambiente ${idx + 1}`,
        newId: idx + 1,
      }));

      if (!HOST) {
        Alert.alert('Erro', 'HOST não configurado em expoConfig.extra.apiurl');
        return;
      }
      if (!usuarioLogado?.token) {
        Alert.alert('Erro', 'Token ausente para autenticação.');
        return;
      }

      const resp = await fetch(`http://${HOST}:5000/newAmbientesIds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${usuarioLogado.token}`,
        },
        body: JSON.stringify({ newAmbientesIds }),
      });

      if (!resp.ok) {
        const texto = await resp.text().catch(() => '');
        throw new Error(`Falha ao salvar ordem (${resp.status}): ${texto}`);
      }

      // opcional: já atualiza os IDs locais com o que foi salvo
      const mapNomeToNewId = new Map(newAmbientesIds.map(x => [x.nome, x.newId]));
      setOrdem((prev) => prev.map(a => ({ ...a, id: mapNomeToNewId.get(a.nome) ?? a.id })));

      Alert.alert('Pronto!', 'A nova ordem foi salva.');
      setEditando(false);
    } catch (e) {
      Alert.alert('Erro ao salvar', e?.message ?? 'Tente novamente.');
    }
  }, [ordem, HOST, usuarioLogado]);

  // >>>>>>>>>>>> CORREÇÃO IMPORTANTE <<<<<<<<<<<
  // Busca o ambiente atualizado e navega passando 'ambiente' em route params.
  const openAmbiente = useCallback(async (amb) => {
    const routeName = getAmbRouteName(amb);

    // se faltar HOST ou token, navega com o que tem (ao menos passamos os params!)
    if (!HOST || !usuarioLogado?.token) {
      return navigation.push(routeName, { ambiente: amb });
    }

    try {
      // ajuste a URL conforme seu backend
      const resp = await fetch(`http://${HOST}:5000/ambientes/${amb.id}`, {
        headers: {
          Authorization: `Bearer ${usuarioLogado.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (resp.ok) {
        const data = await resp.json().catch(() => null);
        const ambienteAtual = data?.ambiente ?? amb;
        // força nova instância + passa params atualizados
        return navigation.push(routeName, { ambiente: ambienteAtual });
      }

      // fallback (erro no GET): ainda assim passa o que tem
      return navigation.push(routeName, { ambiente: amb });
    } catch {
      // fallback de rede
      return navigation.push(routeName, { ambiente: amb });
    }
  }, [HOST, usuarioLogado?.token, navigation]);

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
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="reorder-two-outline" size={22} style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 16 }}>{item?.nome || 'Sem nome'}</Text>
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="menu"
          size={28}
          onPress={() =>
            navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())
          }
          style={{ marginLeft: 15 }}
        />
      ),
      title: 'Início',
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
            onPress={onToggleEditar}
            style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="create-outline" size={22} style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 16 }}>Editar</Text>
          </TouchableOpacity>
        ),
    });
  }, [navigation, editando, onSalvar, onToggleEditar]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FloatingPuzzleBackground />

      {!editando ? (
        ordem?.length > 0 ? (
          ordem.map((ambiente, i) => {
            const key = String(ambiente?.id ?? ambiente?.nome ?? i);
            return (
              <NavegacaoBotao
                key={key}
                titulo={ambiente?.nome || 'Sem nome'}
                estilo={styles.button}
                estiloTexto={styles.buttonText}
                // >>> usa a função corrigida para abrir o ambiente
                onPress={() => openAmbiente(ambiente)}
              />
            );
          })
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum ambiente disponível
          </Text>
        )
      ) : (
        <View style={{ width: '100%', paddingHorizontal: 16, marginTop: 6 }}>
          {ordem?.length > 0 ? (
            ordem.map((amb, idx) => (
              <LinhaEdicao
                key={String(amb?.id ?? amb?.nome ?? idx)}
                item={amb}
                index={idx}
                total={ordem.length}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Nenhum ambiente para editar
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default InicioScreen;
