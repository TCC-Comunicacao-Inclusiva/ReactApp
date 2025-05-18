import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import AmbienteScreen from './screens/ambiente';
import AprendizadoScreen from './screens/aprendizado';
import InicioScreen from './screens/inicio';
import LoginScreen from './screens/login';
import PerfilScreen from './screens/perfil';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Aprendizado" component={AprendizadoScreen} />
      <Stack.Screen name="Main" component={MainDrawer} />
    </Stack.Navigator>
  );
}


function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Início">
      <Drawer.Screen name="Início" component={InicioScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Novo Ambiente" component={AmbienteScreen} />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
