import { Image, Text, View } from 'react-native';
import stylesPerfil from '../styles/stylesPerfil';
import localPhoto from '../icons/profile.jpg';

export default function PerfilScreen() {
  const userData = {
    name: "João Silva",
    age: "8 anos",
    interests: "Jogos educativos, música, histórias interativas",
  };

  return (
    <View style={stylesPerfil.container}>
 
      <View style={stylesPerfil.photoContainer}>
        <Image source={localPhoto} style={stylesPerfil.photo} />
      </View>

    
      <View style={stylesPerfil.infoBlock}>
        <Text style={stylesPerfil.infoLabel}>Nome:</Text>
        <Text style={stylesPerfil.infoText}>{userData.name}</Text>
      </View>

    
      <View style={stylesPerfil.infoBlock}>
        <Text style={stylesPerfil.infoLabel}>Idade:</Text>
        <Text style={stylesPerfil.infoText}>{userData.age}</Text>
      </View>

      <View style={stylesPerfil.infoBlock}>
        <Text style={stylesPerfil.infoLabel}>Interesses:</Text>
        <Text style={stylesPerfil.infoText}>{userData.interests}</Text>
      </View>
    </View>
  );
}
