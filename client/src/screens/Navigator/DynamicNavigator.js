// src/screens/Navigator/DynamicNavigator.js
import React, { useMemo, useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect, DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import PaginaAmbiente from '../PaginaAmbiente';
import InicioScreen from '../Inicio/Inicio';
import ambienteService from '../../services/ambienteService';
import { getAmbRouteName } from '../../utils/nav';

const Stack = createStackNavigator();

const DynamicNavigator = () => {
  const [ambientes, setAmbientes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await ambienteService.getAmbientes();
          setAmbientes(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error('Erro ao recarregar ambientes:', e);
        }
      };
      fetchData();
    }, [])
  );

  const ambientesUnicos = useMemo(() => {
    const seen = new Set();
    return ambientes.filter((a, i) => {
      const k = String(a?.id ?? a?.nome ?? i).trim().toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [ambientes]);

  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      {/* Início COM header */}
      <Stack.Screen
        name="Inicio"
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Início',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="menu" size={28} />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => <InicioScreen {...props} ambientes={ambientesUnicos} />}
      </Stack.Screen>

      {/* Ambientes COM header também */}
      {ambientesUnicos.map((amb) => {
        const routeName = getAmbRouteName(amb);
        return (
          <Stack.Screen
            key={`screen_${routeName}`}
            name={routeName}
            options={({ navigation }) => ({
              headerShown: true,
              title: amb.nome,
              headerTitleAlign: 'center',
              // usa menu no lugar do botão "voltar"; se preferir voltar, remova headerLeft
              headerBackVisible: false,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
                  style={{ marginLeft: 15 }}
                >
                  <Ionicons name="menu" size={28} />
                </TouchableOpacity>
              ),
            })}
            initialParams={{ ambiente: amb }}
          >
            {(props) => <PaginaAmbiente {...props} />}
          </Stack.Screen>
        );
      })}
    </Stack.Navigator>
  );
};

export default DynamicNavigator;
