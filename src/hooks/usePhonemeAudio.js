import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const PHONEME_MAP = {
  a: require('../../assets/sounds/phonemes/alphasounds-a.mp3'),
  b: require('../../assets/sounds/phonemes/alphasounds-b.mp3'),
  c: require('../../assets/sounds/phonemes/alphasounds-c.mp3'),
  d: require('../../assets/sounds/phonemes/alphasounds-d.mp3'),
  e: require('../../assets/sounds/phonemes/alphasounds-e.mp3'),
  f: require('../../assets/sounds/phonemes/alphasounds-f.mp3'),
  g: require('../../assets/sounds/phonemes/alphasounds-g.mp3'),
  h: require('../../assets/sounds/phonemes/alphasounds-h.mp3'),
  i: require('../../assets/sounds/phonemes/alphasounds-i.mp3'),
  j: require('../../assets/sounds/phonemes/alphasounds-j.mp3'),
  k: require('../../assets/sounds/phonemes/alphasounds-k.mp3'),
  l: require('../../assets/sounds/phonemes/alphasounds-l.mp3'),
  m: require('../../assets/sounds/phonemes/alphasounds-m.mp3'),
  n: require('../../assets/sounds/phonemes/alphasounds-n.mp3'),
  o: require('../../assets/sounds/phonemes/alphasounds-o-sh.mp3'),
  p: require('../../assets/sounds/phonemes/alphasounds-p-2.mp3'),
  q: require('../../assets/sounds/phonemes/alphasounds-q.mp3'),
  r: require('../../assets/sounds/phonemes/alphasounds-r.mp3'),
  s: require('../../assets/sounds/phonemes/alphasounds-s.mp3'),
  t: require('../../assets/sounds/phonemes/alphasounds-t.mp3'),
  u: require('../../assets/sounds/phonemes/alphasounds-u-sh.mp3'),
  v: require('../../assets/sounds/phonemes/alphasounds-v.mp3'),
  w: require('../../assets/sounds/phonemes/alphasounds-w.mp3'),
  x: require('../../assets/sounds/phonemes/alphasounds-x.mp3'),
  y: require('../../assets/sounds/phonemes/alphasounds-y.mp3'),
  z: require('../../assets/sounds/phonemes/alphasounds-z.mp3'),
};

export function usePhonemeAudio() {
  const soundRef = useRef(null);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  async function playPhoneme(letter) {
    const asset = PHONEME_MAP[letter.toLowerCase()];
    if (!asset) return;
    if (soundRef.current) await soundRef.current.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(asset);
    soundRef.current = sound;
    await sound.playAsync();
  }

  return { playPhoneme };
}
