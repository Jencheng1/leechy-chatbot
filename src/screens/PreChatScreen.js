import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { SvgUri } from 'react-native-svg';

const SUGGESTIONS = [
  'Can I offer local pickup?',
  'Can I cancel a booking?',
  'Give me ideas to rent',
  'How do I deliver an item?',
  'What if the item is damaged?',
  'Do I have to clean it?',
  'Show me trending items',
  'Find storage space'
];

const PreChatScreen = ({ onMessageSubmit }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const handleSuggestionPress = (suggestion) => {
    onMessageSubmit(suggestion);
  };

  // Group suggestions into rows
  const suggestionRows = [
    SUGGESTIONS.slice(0, 2),
    SUGGESTIONS.slice(2, 5),
    SUGGESTIONS.slice(5, 8)
  ];

  return (
    <LinearGradient
      colors={['#FFFFFF', '#7BEB9A']}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        {Platform.OS === 'web' ? (
          <img src={require('../assets/leechy-icon.svg')} style={styles.logo} alt="Leechy Logo" />
        ) : (
          <View style={styles.logoPlaceholder}>
            <SvgUri
              width="64"
              height="64"
              uri={require('../assets/leechy-icon.svg')}
            />
          </View>
        )}
      </View>
      
      <Text style={styles.greeting}>
        Hi there! 👋 I'm Leechy's AI Chatbot. How may I assist you today?
      </Text>
      
      <View style={styles.suggestionsContainer}>
        {suggestionRows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.suggestionRow}>
            {row.map((suggestion, index) => (
              <TouchableOpacity
                key={`suggestion-${rowIndex}-${index}`}
                style={styles.suggestionButton}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  greeting: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '80%',
  },
  suggestionsContainer: {
    width: '100%',
    maxWidth: 500,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  suggestionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#333',
  },
});

export default PreChatScreen;
