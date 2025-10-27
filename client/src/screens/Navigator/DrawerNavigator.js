// src/screens/Navigator/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DynamicNavigator from './DynamicNavigator';
import PerfilScreen from '../Perfil/Perfil';
import NovoAmbienteScreen from '../NovoAmbiente/NovoAmbiente';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      // headerShown: false APENAS para o DynamicNavigator,
      // assim Perfil e NovoAmbiente continuam com header normal.
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={DynamicNavigator}
        options={{
          title: 'Início',
          headerShown: false, // <=== desativa header só aqui
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ title: 'Meu Perfil', headerShown: true }}
      />
      <Drawer.Screen
        name="NovoAmbiente"
        component={NovoAmbienteScreen}
        options={{ title: 'Novo Ambiente', headerShown: true }}
      />
    </Drawer.Navigator>
  );
}
