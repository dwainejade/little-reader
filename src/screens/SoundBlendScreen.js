import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePhonemeAudio } from '../hooks/usePhonemeAudio';
import { WORDS, TILE_COLORS } from '../data/words';

const ZONE_OUTLINE_COLORS = ['#FF6B6B', '#4ECDC4', '#A78BFA', '#FFE66D', '#FF9F43'];

export function SoundBlendScreen() {
  const [wordIndex, setWordIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const currentWord = WORDS[wordIndex].word;
  const letters = currentWord.split('');

  const { playPhoneme, stopAll } = usePhonemeAudio(letters);

  // Zone strip layout: measured once, reused for hit testing
  const stripLayout = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const lastActiveIndex = useRef(null);
  const activeTimeout = useRef(null);

  const getIndexAtPoint = (pageX, pageY) => {
    const { x, y, width, height } = stripLayout.current;
    if (width === 0) return -1;
    if (pageY < y || pageY > y + height) return -1;
    if (pageX < x || pageX > x + width) return -1;
    const zoneWidth = width / letters.length;
    return Math.floor((pageX - x) / zoneWidth);
  };

  const triggerIndex = (index) => {
    if (index < 0 || index >= letters.length) return;
    if (lastActiveIndex.current === index) return;
    lastActiveIndex.current = index;
    setActiveIndex(index);
    playPhoneme(index);
    clearTimeout(activeTimeout.current);
    activeTimeout.current = setTimeout(() => setActiveIndex(null), 400);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        triggerIndex(getIndexAtPoint(evt.nativeEvent.pageX, evt.nativeEvent.pageY));
      },
      onPanResponderMove: (evt) => {
        triggerIndex(getIndexAtPoint(evt.nativeEvent.pageX, evt.nativeEvent.pageY));
      },
      onPanResponderRelease: () => {
        clearTimeout(activeTimeout.current);
        lastActiveIndex.current = null;
        setActiveIndex(null);
      },
    })
  ).current;

  const resetActive = () => {
    clearTimeout(activeTimeout.current);
    lastActiveIndex.current = null;
    setActiveIndex(null);
    stopAll();
  };

  const goToNextWord = () => {
    resetActive();
    setWordIndex((i) => (i + 1) % WORDS.length);
  };

  const goToPrevWord = () => {
    resetActive();
    setWordIndex((i) => (i - 1 + WORDS.length) % WORDS.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sound & Blend</Text>
      <Text style={styles.hint}>Slide your finger across the letters</Text>

      <View
        style={styles.touchStrip}
        {...panResponder.panHandlers}
        onLayout={(evt) => {
          const { x, y, width, height } = evt.nativeEvent.layout;
          // onLayout gives coords relative to parent; we need page coords
          evt.target.measure((fx, fy, fw, fh, px, py) => {
            stripLayout.current = { x: px, y: py, width: fw, height: fh };
          });
        }}
      >
        {letters.map((letter, index) => {
          const isActive = activeIndex === index;
          const zoneColor = ZONE_OUTLINE_COLORS[index % ZONE_OUTLINE_COLORS.length];
          return (
            <View key={`${currentWord}-${index}`} style={styles.zone}>
              {/* Zone outline */}
              <View
                style={[
                  styles.zoneOutline,
                  { borderColor: zoneColor },
                  isActive && { backgroundColor: zoneColor + '22' },
                ]}
              />
              {/* Letter tile floating inside the zone */}
              <View
                style={[
                  styles.tile,
                  { backgroundColor: isActive ? '#FFE66D' : TILE_COLORS[index % TILE_COLORS.length] },
                  isActive && styles.tileActive,
                ]}
              >
                <Text style={styles.letter}>{letter.toUpperCase()}</Text>
              </View>
            </View>
          );
        })}
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
  touchStrip: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    height: 160,
  },
  zone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  zoneOutline: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 0,
    right: 0,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  tile: {
    width: 90,
    height: 100,
    borderRadius: 20,
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
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#00000030',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
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
