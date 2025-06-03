import React, { useEffect, useState } from 'react';
import {createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import PaginaAmbiente from '../PaginaAmbiente.js';
import InicioScreen from '../Inicio/Inicio.js';
import ambienteService from '../../services/ambienteService.js';

const Stack = createStackNavigator();

const DynamicNavigator = () => {
  const [ambientes, setAmbientes] = useState([]);

  useFocusEffect(
  React.useCallback(() => {
    const fetchData = async () => {
      try {
        const data = await ambienteService.getAmbientes();
        setAmbientes(data);
      } catch (error) {
        console.error('Erro ao recarregar ambientes:', error);
      }
    };
    fetchData();
  }, [])
);


  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio">
        {(props) => <InicioScreen {...props} ambientes={ambientes} />}
      </Stack.Screen>

      {ambientes.map((ambiente) => (
        <Stack.Screen
          key={ambiente.id}
          name={ambiente.nome}
          options={{ title: ambiente.nome }}
        >
          {(props) => (
            <PaginaAmbiente
              {...props}
              route={{ ...props.route, params: { ambiente } }}
            />
          )}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default DynamicNavigator;
