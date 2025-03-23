import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { moveTile } from '../utils/gameLogic';
import styles from '../styles/styles';

interface PuzzleBoardProps {
  board: number[];
  imageUri: string | null; // Ajout de l'URI de l'image
  onMove: (newBoard: number[]) => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ board, imageUri, onMove }) => {
  const GRID_SIZE = 3;

  const handleTilePress = (index: number) => {
    const newBoard = moveTile([...board], index, GRID_SIZE);
    if (newBoard) {
      onMove(newBoard);
    }
  };

  return (
    <View style={styles.board}>
      {board.map((tile, index) => (
        <Tile
          key={index}
          tile={tile}
          index={index}
          imageUri={imageUri}
          onPress={() => handleTilePress(index)}
        />
      ))}
    </View>
  );
};

export default PuzzleBoard;