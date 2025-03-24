import React from 'react';
import { View } from 'react-native';
import Tile from './Tile';
import { moveTile, getTilePosition } from '../utils/gameLogic';
import styles from '../styles/styles';

interface PuzzleBoardProps {
  board: number[];
  imageUri: string | null;
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

  const handleSwipe = (index: number, direction: string) => {
    const tilePos = getTilePosition(index, GRID_SIZE);
    const emptyIndex = board.indexOf(8);
    const emptyPos = getTilePosition(emptyIndex, GRID_SIZE);

    let shouldMove = false;

    // Vérifier si le glissement correspond à un mouvement valide vers la case vide
    switch (direction) {
      case 'up':
        if (tilePos.row > 0 && emptyPos.row === tilePos.row - 1 && emptyPos.col === tilePos.col) {
          shouldMove = true;
        }
        break;
      case 'down':
        if (tilePos.row < GRID_SIZE - 1 && emptyPos.row === tilePos.row + 1 && emptyPos.col === tilePos.col) {
          shouldMove = true;
        }
        break;
      case 'left':
        if (tilePos.col > 0 && emptyPos.col === tilePos.col - 1 && emptyPos.row === tilePos.row) {
          shouldMove = true;
        }
        break;
      case 'right':
        if (tilePos.col < GRID_SIZE - 1 && emptyPos.col === tilePos.col + 1 && emptyPos.row === tilePos.row) {
          shouldMove = true;
        }
        break;
      default:
        break;
    }

    if (shouldMove) {
      const newBoard = moveTile([...board], index, GRID_SIZE);
      if (newBoard) {
        onMove(newBoard);
      }
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
          onSwipe={(direction) => handleSwipe(index, direction)}
        />
      ))}
    </View>
  );
};

export default PuzzleBoard;