import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext.js';

import LoginScreen from './src/screens/login/Login.js';
import InicioScreen from './src/screens/Inicio/Inicio.js';
import PerfilScreen from './src/screens/Perfil/Perfil.js';
import AmbienteScreen from './src/screens/Ambiente/Ambiente.js';
import AprendizadoScreen from './src/screens/Aprendizado/Aprendizado.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inicio" component={InicioScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Ambiente" component={AmbienteScreen} />
          <Stack.Screen name="Aprendizado" component={AprendizadoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
