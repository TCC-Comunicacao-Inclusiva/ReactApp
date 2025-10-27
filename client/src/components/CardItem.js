import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import styles from '../styles/stylesTelaAudio.js';

const HOST =
  Constants?.expoConfig?.extra?.apiurl ||
  Constants?.manifest?.extra?.apiurl ||
  '10.0.2.2';

const API_URL = `http://${HOST}:5000/event`;

// ✅ agora recebe { ambiente } também
async function postEvento({ dataISO, latitude, longitude, texto, ambiente }) {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token ausente');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: dataISO,
      latitude,
      longitude,
      texto,
      ambiente, // ✅ enviado ao backend
    }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => 'Erro ao enviar evento');
    throw new Error(msg);
  }
  return res.json().catch(() => ({}));
}

const CardItem = ({ conteudo }) => {
  const imageSource = conteudo?.imagem ?? null;
  const titulo = conteudo?.titulo ?? '';
  const ambiente = conteudo?.ambiente ?? '';
  const audioSource = conteudo?.audio ?? null; // ← require(...) passado pela PaginaAmbiente

  const soundRef = useRef(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // Libera o áudio quando o componente sai de tela
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, []);

  // Configura o modo de áudio (opcional, ajuda no Android/iOS)
  useEffect(() => {
    (async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: false,
        });
      } catch (e) {
        // silencioso
      }
    })();
  }, []);

  const tocarAudio = useCallback(async () => {
    if (!audioSource) return; // sem áudio vinculado, só envia evento

    if (isLoadingAudio) return;

    setIsLoadingAudio(true);
    try {
      // carrega uma vez e reaproveita
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync(audioSource, {
          shouldPlay: false,
        });
        soundRef.current = sound;
      }

      const sound = soundRef.current;

      // Sempre reinicia do começo ao tocar
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (e) {
      console.error('[CardItem] Falha ao tocar áudio:', e?.message ?? e);
    } finally {
      setIsLoadingAudio(false);
    }
  }, [audioSource, isLoadingAudio]);

  const handlePress = async () => {
    try {
      // 1) Toca o áudio (se houver)
      await tocarAudio();

      // 2) Pede localização e envia o evento
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const agora = new Date();
      const localISO = new Date(
        agora.getTime() - agora.getTimezoneOffset() * 60000
      ).toISOString();

      await postEvento({
        dataISO: localISO,
        latitude: coords.latitude,
        longitude: coords.longitude,
        texto: titulo,
        ambiente,
      });
    } catch (e) {
      console.error('[CardItem] Falha ao executar ação:', e?.message ?? e);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isLoadingAudio}
    >
      {imageSource ? <Image source={imageSource} style={styles.buttonImage} /> : null}
      <Text style={styles.buttonText}>
        {isLoadingAudio ? 'Carregando...' : titulo}
      </Text>
    </TouchableOpacity>
  );
};

export default CardItem;
