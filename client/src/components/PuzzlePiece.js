import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Easing } from 'react-native';

const getRandom = (min, max) => Math.random() * (max - min) + min;

const PuzzlePiece = ({ startX, startY, delay, imageSource }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Valores ajustados para suavidade
  const rotateDeg = getRandom(90, 360); // Rotação leve: 1/4 a 1 volta completa
  const translateXMax = getRandom(5, 15);  // Movimento lateral mais sutil
  const translateYMax = getRandom(20, 40); // Flutuação mais leve
  const duration = getRandom(5000, 9000);  // Duração mais longa = mais suave

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.inOut(Easing.sin), // Easing suave
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [translateYMax, -translateYMax],
  });

  const translateX = floatAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, translateXMax, 0],
  });

  const rotate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${rotateDeg}deg`],
  });

  return (
    <Animated.Image
      source={imageSource}
      style={[
        styles.piece,
        {
          left: startX,
          top: startY,
          transform: [{ translateY }, { translateX }, { rotate }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    width: 40,
    height: 40,
    opacity: 1,
  },
});

export default PuzzlePiece;
