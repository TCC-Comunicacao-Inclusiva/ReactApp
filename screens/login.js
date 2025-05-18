import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import stylesLogin from '../styles/stylesLogin';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isTutor, setIsTutor] = useState(true); 

  const handleLogin = () => {
    
    if (isTutor) {
      navigation.replace('Main'); 
    } else {
      navigation.replace('Aprendizado'); 
    }
  };

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>{isTutor ? 'Login Tutor' : 'Login Usuário'}</Text>

      <TextInput 
        style={stylesLogin.input} 
        placeholder="Usuário" 
        value={username} 
        onChangeText={setUsername} 
      />
      
      <TextInput 
        style={stylesLogin.input} 
        placeholder="Senha" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />

      <TouchableOpacity style={stylesLogin.switchButton} onPress={() => setIsTutor(!isTutor)}>
        <Text style={stylesLogin.switchText}>
          Alternar para {isTutor ? 'Usuário' : 'Tutor'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
        <Text style={stylesLogin.buttonText}>
          Entrar como {isTutor ? 'Tutor' : 'Usuário'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
