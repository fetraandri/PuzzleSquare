import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from '../styles/styles';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Passer à l'écran principal après 3 secondes
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashTitle}>PuzzleSquare</Text>
      <Animated.Text style={[styles.splashSubtitle, { opacity: fadeAnim }]}>
        Chargement...
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;