import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import stylesInicio from '../styles/stylesInicio';

export default function InicioScreen({ navigation }) {
  return (
    <View style={stylesInicio.container}>
      <TouchableOpacity style={stylesInicio.button} onPress={() => navigation.navigate('Aprendizado')}>
        <Text style={stylesInicio.buttonText}>Aprendizado</Text>
        <Ionicons name="book" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={stylesInicio.button} onPress={() => navigation.navigate('Perfil')}>
        <Text style={stylesInicio.buttonText}>Perfil</Text>
        <Ionicons name="person" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={stylesInicio.button} onPress={() => navigation.navigate('Ambiente')}>
        <Text style={stylesInicio.buttonText}>Ambiente</Text>
        <Ionicons name="home" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
