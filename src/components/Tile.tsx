import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import styles from '../styles/styles';

const DEFAULT_IMAGE = require('../../assets/Profilpro.jpg'); // Image par défaut
const TILE_SIZE = 100;
const GRID_SIZE = 3;

interface TileProps {
  tile: number;
  index: number;
  imageUri: string | null; // URI de l'image sélectionnée
  onPress: () => void;
}

const Tile: React.FC<TileProps> = ({ tile, index, imageUri, onPress }) => {
  if (tile === 8) {
    return <View style={styles.tile} />;
  }

  const row = Math.floor(tile / GRID_SIZE);
  const col = tile % GRID_SIZE;

  // Utiliser l'image sélectionnée ou l'image par défaut
  const imageSource = imageUri ? { uri: imageUri } : DEFAULT_IMAGE;

  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Image
        source={imageSource}
        style={{
          width: TILE_SIZE * GRID_SIZE,
          height: TILE_SIZE * GRID_SIZE,
          transform: [
            { translateX: -col * TILE_SIZE },
            { translateY: -row * TILE_SIZE },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

export default Tile;