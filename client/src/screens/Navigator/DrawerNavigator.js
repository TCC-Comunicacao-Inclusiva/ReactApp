// src/screens/Navigator/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DynamicNavigator from './DynamicNavigator.js';
import PerfilScreen from '../Perfil/Perfil.js';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={DynamicNavigator} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Novo Ambiente" component={''} />
    </Drawer.Navigator>
  );
}
