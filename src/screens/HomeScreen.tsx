import React, { useState, useEffect } from 'react';
import { View, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PuzzleBoard from '../components/PuzzleBoard';
import Button from '../components/Button';
import { shuffleBoard, checkWin } from '../utils/gameLogic';
import styles from '../styles/styles';

const HomeScreen: React.FC = () => {
  const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [board, setBoard] = useState<number[]>(initialBoard);
  const [moves, setMoves] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    handleShuffle();
  }, []);

  const requestStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    try {
      console.log('Demande de permission READ_EXTERNAL_STORAGE...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission de stockage',
          message: 'Cette application a besoin d’accéder à votre galerie pour choisir une image.',
          buttonNeutral: 'Demander plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        }
      );
      console.log('Résultat de la demande de permission :', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Erreur lors de la demande de permission :', err);
      return false;
    }
  };

  const handleChooseImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      console.log('Permission refusée ou non accordée');
      Alert.alert('Permission refusée', 'Vous devez autoriser l’accès à la galerie pour choisir une image.');
      return;
    }

    console.log('Lancement de la sélection d’image...');
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Sélection annulée par l’utilisateur');
      } else if (response.errorCode) {
        console.log('Erreur lors de la sélection :', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          console.log('Image sélectionnée :', uri);
          setSelectedImage(uri);
          handleShuffle();
        }
      } else {
        console.log('Aucune image sélectionnée');
      }
    });
  };

  const handleShuffle = () => {
    const shuffledBoard = shuffleBoard([...initialBoard]);
    setBoard(shuffledBoard);
    setMoves(0);
  };

  const handleMove = (newBoard: number[]) => {
    setBoard(newBoard);
    setMoves(moves + 1);
    if (checkWin(newBoard, initialBoard)) {
      Alert.alert(
        'Félicitations !',
        `Vous avez gagné en ${moves + 1} mouvements !`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          { text: 'Recommencer', onPress: handleShuffle },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzleSquare</Text>
      <Text style={styles.moves}>Mouvements : {moves}</Text>
      <PuzzleBoard board={board} imageUri={selectedImage} onMove={handleMove} />
      <Button title="Choisir une image" onPress={handleChooseImage} />
      <Button title="Recommencer" onPress={handleShuffle} />
    </View>
  );
};

export default HomeScreen;