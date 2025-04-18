import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import PreChatScreen from './src/screens/PreChatScreen';
import ChatScreen from './src/screens/ChatScreen';

// Set the API base URL based on environment
const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:5000' 
  : 'http://10.0.2.2:5000'; // Use 10.0.2.2 for Android emulator

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleMessageSubmit = (message) => {
    setInitialMessage(message);
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setInitialMessage('');
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!showChat ? (
        <PreChatScreen onMessageSubmit={handleMessageSubmit} />
      ) : (
        <ChatScreen initialMessage={initialMessage} onClose={handleCloseChat} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        maxWidth: '100%',
        maxHeight: '100vh',
        overflow: 'hidden',
      },
    }),
  },
});
