import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';


const HOST = Constants.expoConfig.extra.apiurl;


const API_URL = `http://${HOST}:5000/allambientes`;

const getAmbientes = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error('Erro ao buscar ambientes');
  }

  const data = await response.json();
  return data.ambientes;
};

export default { getAmbientes };
