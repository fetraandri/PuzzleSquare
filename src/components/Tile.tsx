import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import styles from '../styles/styles';

const IMAGE_SOURCE = require('../../assets/Profilpro.jpg');
const TILE_SIZE = 100;
const GRID_SIZE = 3;

interface TileProps {
  tile: number;
  index: number;
  onPress: () => void;
}

const Tile: React.FC<TileProps> = ({ tile, index, onPress }) => {
  if (tile === 8) {
    return <View style={styles.tile} />;
  }

  const row = Math.floor(tile / GRID_SIZE);
  const col = tile % GRID_SIZE;

  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Image
        source={IMAGE_SOURCE}
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