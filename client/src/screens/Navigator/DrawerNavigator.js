// src/screens/Navigator/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DynamicNavigator from './DynamicNavigator.js';
import PerfilScreen from '../Perfil/Perfil.js';
import NovoAmbienteScreen from '../NovoAmbiente/NovoAmbiente.js';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DrawerInicio">
      {/* Nome de rota ÚNICO no Drawer; título exibido como "Início" */}
      <Drawer.Screen
        name="DrawerInicio"
        component={DynamicNavigator}
        options={{ title: 'Início' }}
      />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="NovoAmbiente" component={NovoAmbienteScreen} />
    </Drawer.Navigator>
  );
}
