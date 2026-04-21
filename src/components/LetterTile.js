import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export function LetterTile({ letter, color, isActive, onPress, tileRef }) {
  return (
    <TouchableOpacity
      ref={tileRef}
      onPress={onPress}
      onLongPress={onPress}
      delayLongPress={200}
      activeOpacity={0.7}
      style={[
        styles.tile,
        { backgroundColor: isActive ? '#FFE66D' : color },
        isActive && styles.tileActive,
      ]}
    >
      <Text style={styles.letter}>{letter.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 100,
    height: 110,
    borderRadius: 24,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00000040',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 3,
    borderColor: '#FFFFFF60',
  },
  tileActive: {
    transform: [{ scale: 1.08 }],
    shadowOpacity: 0.35,
  },
  letter: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#00000030',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
});
