// import React from 'react';
// import { Text, Image, TouchableOpacity } from 'react-native';
// import styles from '../styles/stylesTelaAudio.js';

// const CardItem = ({ conteudo, onPress }) => (
//   <TouchableOpacity style={styles.button} onPress={onPress}>
//     {conteudo.getImagem() && (
//       <Image source={conteudo.getImagem()} style={styles.buttonImage} />
//     )}
//     <Text style={styles.buttonText}>{conteudo.getTitulo()}</Text>
//   </TouchableOpacity>
// );

// export default CardItem;
// services/apiEvento.js
// src/components/CardItem.js
// src/components/CardItem.js
// src/components/CardItem.js




//######################################################################
// import React, { useState } from 'react';
// import { Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import * as Location from 'expo-location';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants';
// import styles from '../styles/stylesTelaAudio.js';

// const HOST = Constants?.expoConfig?.extra?.apiurl || Constants?.manifest?.extra?.apiurl || '10.0.2.2';
// const API_URL = `http://${HOST}:5000/event`;

// async function postEvento({ dataISO, latitude, longitude, texto }) {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) throw new Error('Token ausente');

//   const res = await fetch(API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//     body: JSON.stringify({ data: dataISO, latitude, longitude, texto }),
//   });

//   if (!res.ok) {
//     const msg = await res.text().catch(() => 'Erro ao enviar evento');
//     throw new Error(msg);
//   }
//   return res.json().catch(() => ({}));
// }

// const CardItem = ({ conteudo }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePress = async () => {
//     try {
//       setLoading(true);

//       // 1) Permissão
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permissão de localização negada');
//         setLoading(false);
//         return;
//       }

//       // 2) Localização
//       const { coords } = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       // 3) Payload + envio
//       const texto = typeof conteudo?.getTitulo === 'function' ? conteudo.getTitulo() : '';
//       const agora = new Date();
//       const localISO = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000).toISOString();
//       await postEvento({
        
//         dataISO: localISO,
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         texto,
//       });

//       Alert.alert('Evento enviado com sucesso!');
//     } catch (e) {
//       console.error(e);
//       Alert.alert('Falha ao enviar evento', e?.message ?? '');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const imageSource = typeof conteudo?.getImagem === 'function' ? conteudo.getImagem() : null;

//   return (
//     <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading} activeOpacity={0.8}>
//       {imageSource ? <Image source={imageSource} style={styles.buttonImage} /> : null}
//       <Text style={styles.buttonText}>
//         {typeof conteudo?.getTitulo === 'function' ? conteudo.getTitulo() : ''}
//       </Text>
//       {loading ? <ActivityIndicator style={{ marginTop: 6 }} /> : null}
//     </TouchableOpacity>
//   );
// };

// export default CardItem;
//############################################################


// src/components/CardItem.js
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import styles from '../styles/stylesTelaAudio.js';

const HOST =
  Constants?.expoConfig?.extra?.apiurl ||
  Constants?.manifest?.extra?.apiurl ||
  '10.0.2.2';

const API_URL = `http://${HOST}:5000/event`;

async function postEvento({ dataISO, latitude, longitude, texto }) {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token ausente');

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: dataISO, latitude, longitude, texto }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => 'Erro ao enviar evento');
    throw new Error(msg);
  }
  return res.json().catch(() => ({}));
}

const CardItem = ({ conteudo }) => {
  const handlePress = async () => {
    try {
      // 1) Pede permissão
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      // 2) Pega localização
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // 3) Monta payload
      const texto =
        typeof conteudo?.getTitulo === 'function' ? conteudo.getTitulo() : '';
      const agora = new Date();
      const localISO = new Date(
        agora.getTime() - agora.getTimezoneOffset() * 60000
      ).toISOString();

      // 4) Envia pro backend (silencioso)
      await postEvento({
        dataISO: localISO,
        latitude: coords.latitude,
        longitude: coords.longitude,
        texto,
      });
    } catch (e) {
      // apenas log no console, sem feedback pro usuário
      console.error('[CardItem] Falha ao enviar evento:', e?.message ?? e);
    }
  };

  const imageSource =
    typeof conteudo?.getImagem === 'function' ? conteudo.getImagem() : null;

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
      {imageSource ? (
        <Image source={imageSource} style={styles.buttonImage} />
      ) : null}
      <Text style={styles.buttonText}>
        {typeof conteudo?.getTitulo === 'function'
          ? conteudo.getTitulo()
          : ''}
      </Text>
    </TouchableOpacity>
  );
};

export default CardItem;
