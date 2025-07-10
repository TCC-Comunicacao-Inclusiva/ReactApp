import React, { useLayoutEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavegacaoBotao from '../../components/NavegacaoBotao.js';
import styles from '../../styles/stylesInicio.js';
import FloatingPuzzleBackground from '../../components/PuzzleBackground.js';

const InicioScreen = ({ navigation, ambientes }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons
          name="menu"
          size={28}
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 15 }}
        />
      ),
      title: 'Início',
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      
      <FloatingPuzzleBackground />


      {ambientes && ambientes.length > 0 ? (
        ambientes.map((ambiente) => (
          <NavegacaoBotao
            key={ambiente.id}
            titulo={ambiente.nome}
            estilo={styles.button}
            estiloTexto={styles.buttonText}
            onPress={() => navigation.navigate(ambiente.nome)}
          />
        ))
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhum ambiente disponível
        </Text>
      )}
    </ScrollView>
  );
};

export default InicioScreen;
