// src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InicioScreen from '../Inicio/Inicio.js';
import PerfilScreen from '../Perfil/Perfil.js';
import AmbienteScreen from '../Ambiente/Ambiente.js';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: true, // <-- IMPORTANTE
      }}
    >
      <Drawer.Screen name="Inicio" component={InicioScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Novo Ambiente" component={AmbienteScreen} />
    </Drawer.Navigator>
  );
}
