import React, { useState, useEffect } from 'react';
import { View, Text, Alert, PermissionsAndroid, Platform, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import PuzzleBoard from '../components/PuzzleBoard';
import Button from '../components/Button';
import { shuffleBoard, checkWin } from '../utils/gameLogic';
import styles from '../styles/styles';

interface Score {
  playerName: string;
  moves: number;
}

const HomeScreen: React.FC = () => {
  const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [board, setBoard] = useState<number[]>(initialBoard);
  const [moves, setMoves] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState<string>(''); // Nom du joueur
  const [topScores, setTopScores] = useState<Score[]>([]); // Meilleurs scores

  useEffect(() => {
    handleShuffle();
    loadTopScores();
  }, []);

  const loadTopScores = async () => {
    try {
      const scoresJson = await AsyncStorage.getItem('topScores');
      if (scoresJson) {
        const scores: Score[] = JSON.parse(scoresJson);
        // Trier par nombre de mouvements (croissant)
        scores.sort((a, b) => a.moves - b.moves);
        setTopScores(scores.slice(0, 5)); // Garder les 5 meilleurs scores
      }
    } catch (error) {
      console.error('Erreur lors du chargement des scores :', error);
    }
  };

  const saveScore = async (newScore: Score) => {
    try {
      const scoresJson = await AsyncStorage.getItem('topScores');
      let scores: Score[] = scoresJson ? JSON.parse(scoresJson) : [];
      scores.push(newScore);
      // Trier par nombre de mouvements et garder les 5 meilleurs
      scores.sort((a, b) => a.moves - b.moves);
      scores = scores.slice(0, 5);
      await AsyncStorage.setItem('topScores', JSON.stringify(scores));
      setTopScores(scores);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du score :', error);
    }
  };

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
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission nécessaire', 'L’accès à la galerie est requis pour choisir une image.');
      }
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
    console.log('État actuel du plateau :', newBoard); // Ajouter ce log
    if (checkWin(newBoard, initialBoard)) {
      console.log('Puzzle résolu !'); // Ajouter ce log
      if (!playerName.trim()) {
        Alert.alert('Nom requis', 'Veuillez entrer votre nom pour enregistrer votre score.');
        return;
      }
  
      const newScore: Score = { playerName: playerName.trim(), moves: moves + 1 };
      saveScore(newScore);
  
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

  const renderScore = ({ item, index }: { item: Score; index: number }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreText}>
        {index + 1}. {item.playerName}: {item.moves} mouvements
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzleSquare</Text>
      <TextInput
        style={styles.input}
        value={playerName}
        onChangeText={setPlayerName}
        placeholder="Entrez votre nom"
        placeholderTextColor="#999"
      />
      <Text style={styles.moves}>Mouvements : {moves}</Text>
      <PuzzleBoard board={board} imageUri={selectedImage} onMove={handleMove} />
      <Button title="Choisir une image" onPress={handleChooseImage} />
      <Button title="Recommencer" onPress={handleShuffle} />

      {/* Section des meilleurs scores */}
      <View style={styles.scoresContainer}>
        <Text style={styles.scoresTitle}>Meilleurs Scores</Text>
        {topScores.length > 0 ? (
          <FlatList
            data={topScores}
            renderItem={renderScore}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.noScoresText}>Aucun score pour le moment.</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;