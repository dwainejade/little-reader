import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LetterTile } from '../components/LetterTile';
import { usePhonemeAudio } from '../hooks/usePhonemeAudio';
import { WORDS, TILE_COLORS } from '../data/words';

export function SoundBlendScreen() {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeLetter, setActiveLetter] = useState(null);
  const { playPhoneme } = usePhonemeAudio();
  const tileRefs = useRef([]);
  const lastSwipedIndex = useRef(null);

  const currentWord = WORDS[wordIndex].word;
  const letters = currentWord.split('');

  const handleTilePress = useCallback((letter) => {
    setActiveLetter(letter);
    playPhoneme(letter);
    setTimeout(() => setActiveLetter(null), 400);
  }, [playPhoneme]);

  // Swipe: measure each tile's position and trigger phoneme when finger crosses it
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        tileRefs.current.forEach((ref, index) => {
          if (!ref) return;
          ref.measure((x, y, width, height, pageXOffset, pageYOffset) => {
            const withinX = pageX >= pageXOffset && pageX <= pageXOffset + width;
            const withinY = pageY >= pageYOffset && pageY <= pageYOffset + height;
            if (withinX && withinY && lastSwipedIndex.current !== index) {
              lastSwipedIndex.current = index;
              const letter = currentWord[index];
              setActiveLetter(letter);
              playPhoneme(letter);
              setTimeout(() => setActiveLetter(null), 400);
            }
          });
        });
      },
      onPanResponderRelease: () => {
        lastSwipedIndex.current = null;
      },
    })
  ).current;

  const goToNextWord = () => {
    setWordIndex((i) => (i + 1) % WORDS.length);
    setActiveLetter(null);
  };

  const goToPrevWord = () => {
    setWordIndex((i) => (i - 1 + WORDS.length) % WORDS.length);
    setActiveLetter(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sound & Blend</Text>
      <Text style={styles.hint}>Tap a letter to hear its sound</Text>

      <View style={styles.tilesRow} {...panResponder.panHandlers}>
        {letters.map((letter, index) => (
          <LetterTile
            key={`${currentWord}-${index}`}
            letter={letter}
            color={TILE_COLORS[index % TILE_COLORS.length]}
            isActive={activeLetter === letter}
            onPress={() => handleTilePress(letter)}
            tileRef={(r) => (tileRefs.current[index] = r)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.readWordButton} onPress={() => {}}>
        <Text style={styles.readWordText}>🔊 Read Word</Text>
      </TouchableOpacity>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navButton} onPress={goToPrevWord}>
          <Text style={styles.navText}>← Prev</Text>
        </TouchableOpacity>
        <Text style={styles.wordCounter}>
          {wordIndex + 1} / {WORDS.length}
        </Text>
        <TouchableOpacity style={styles.navButton} onPress={goToNextWord}>
          <Text style={styles.navText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3142',
    marginBottom: 8,
  },
  hint: {
    fontSize: 16,
    color: '#8A8A9A',
    marginBottom: 48,
  },
  tilesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  readWordButton: {
    marginTop: 48,
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 40,
    shadowColor: '#00000030',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  readWordText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    gap: 24,
  },
  navButton: {
    backgroundColor: '#A78BFA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 32,
  },
  navText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  wordCounter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3142',
  },
});
