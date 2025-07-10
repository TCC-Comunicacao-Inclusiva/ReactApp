import React from 'react';
import PuzzlePiece from './PuzzlePiece';

const FloatingPuzzleBackground = () => {
  const pieces = [
    { x: 30, y: 40, d: 0, img: require('../../icons/puzzle1.png') },
    { x: 300, y: 40, d: 10, img: require('../../icons/puzzle2.png') },
    { x: 180, y: 100, d: 20, img: require('../../icons/puzzle3.png') },
    { x: 330, y: 100, d: 30, img: require('../../icons/puzzle1.png') },
    { x: 60, y: 160, d: 40, img: require('../../icons/puzzle2.png') },
    { x: 200, y: 160, d: 50, img: require('../../icons/puzzle3.png') },
    { x: 40, y: 220, d: 60, img: require('../../icons/puzzle1.png') },
    { x: 290, y: 220, d: 70, img: require('../../icons/puzzle2.png') },
    { x: 20, y: 280, d: 80, img: require('../../icons/puzzle3.png') },
    { x: 300, y: 280, d: 90, img: require('../../icons/puzzle1.png') },
    { x: 10, y: 340, d: 100, img: require('../../icons/puzzle2.png') },
    { x: 221, y: 340, d: 100, img: require('../../icons/puzzle3.png') },
    { x: 157, y: 400, d: 90, img: require('../../icons/puzzle1.png') },
    { x: 56, y: 400, d: 80, img: require('../../icons/puzzle2.png') },
    { x: 32, y: 460, d: 70, img: require('../../icons/puzzle3.png') },
    { x: 256, y: 460, d: 60, img: require('../../icons/puzzle1.png') },
    { x: 14, y: 520, d: 50, img: require('../../icons/puzzle2.png') },
    { x: 300, y: 520, d: 40, img: require('../../icons/puzzle3.png') },
    { x: 24, y: 580, d: 30, img: require('../../icons/puzzle1.png') },
    { x: 190, y: 580, d: 20, img: require('../../icons/puzzle2.png') },
    { x: 40, y: 640, d: 10, img: require('../../icons/puzzle3.png') },
    { x: 256, y: 640, d: 0, img: require('../../icons/puzzle1.png') },
  ];

  return (
    <>
      {pieces.map((p, index) => (
        <PuzzlePiece
          key={index}
          startX={p.x}
          startY={p.y}
          delay={p.d}
          imageSource={p.img}
        />
      ))}
    </>
  );
};

export default FloatingPuzzleBackground;
