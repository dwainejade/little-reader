import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { SoundBlendScreen } from './src/screens/SoundBlendScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="dark" />
      <SoundBlendScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
