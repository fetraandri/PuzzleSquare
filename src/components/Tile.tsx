import React, { useRef } from 'react';
import { TouchableOpacity, Image, View, PanResponder, Animated } from 'react-native';
import styles from '../styles/styles';

const DEFAULT_IMAGE = require('../../assets/Profilpro.jpg');
const TILE_SIZE = 100;
const GRID_SIZE = 3;

interface TileProps {
  tile: number;
  index: number;
  imageUri: string | null;
  onPress: () => void;
  onSwipe: (direction: string) => void;
}

const Tile: React.FC<TileProps> = ({ tile, index, imageUri, onPress, onSwipe }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        // Réinitialiser la position après le glissement
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();

        // Déterminer la direction du glissement
        const { dx, dy } = gesture;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > absDy && absDx > 30) {
          // Glissement horizontal
          if (dx > 0) onSwipe('right');
          else onSwipe('left');
        } else if (absDy > absDx && absDy > 30) {
          // Glissement vertical
          if (dy > 0) onSwipe('down');
          else onSwipe('up');
        }
      },
    })
  ).current;

  if (tile === 8) {
    return <View style={styles.tile} />;
  }

  const row = Math.floor(tile / GRID_SIZE);
  const col = tile % GRID_SIZE;

  const imageSource = imageUri ? { uri: imageUri } : DEFAULT_IMAGE;

  return (
    <Animated.View
      style={[
        styles.tile,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
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
    </Animated.View>
  );
};

export default Tile;