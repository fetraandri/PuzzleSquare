import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native'; // Importer Alert
import PuzzleBoard from '../components/PuzzleBoard';
import Button from '../components/Button';
import { shuffleBoard, checkWin } from '../utils/gameLogic';
import styles from '../styles/styles';

const HomeScreen: React.FC = () => {
  const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [board, setBoard] = useState<number[]>(initialBoard);
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    handleShuffle();
  }, []);

  const handleShuffle = () => {
    const shuffledBoard = shuffleBoard([...initialBoard]);
    setBoard(shuffledBoard);
    setMoves(0);
  };

  const handleMove = (newBoard: number[]) => {
    setBoard(newBoard);
    setMoves(moves + 1);
    if (checkWin(newBoard, initialBoard)) {
      // Utiliser Alert de React Native au lieu de alert
      Alert.alert(
        'Félicitations !',
        `Vous avez gagné en ${moves + 1} mouvements !`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzleSquare</Text>
      <Text style={styles.moves}>Mouvements : {moves}</Text>
      <PuzzleBoard board={board} onMove={handleMove} />
      <Button title="Recommencer" onPress={handleShuffle} />
    </View>
  );
};

export default HomeScreen;