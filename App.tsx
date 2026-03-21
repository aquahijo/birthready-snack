import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';

// Note: expo-av audio session is skipped for Snack compatibility.
// In the full app, App.tsx sets up Audio.setAudioModeAsync() on mount.

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}
