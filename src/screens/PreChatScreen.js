import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import Svg, { Path } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  const [inputText, setInputText] = useState('');

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const handleSuggestionPress = (suggestion) => {
    onMessageSubmit(suggestion);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onMessageSubmit(inputText.trim());
      setInputText('');
    }
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
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Svg width="64" height="64" viewBox="0 0 128 128">
            <Path d="M0 0 C42.24 0 84.48 0 128 0 C128 42.24 128 84.48 128 128 C85.76 128 43.52 128 0 128 C0 85.76 0 43.52 0 0 Z" fill="#3FB884" />
            <Path d="M0 0 C2.69990662 1.79993774 4.5418865 3.083773 6 6 C6.10642856 7.8829321 6.14882656 9.76962021 6.16113281 11.65551758 C6.17074036 12.84047318 6.1803479 14.02542877 6.19024658 15.24629211 C6.19449646 16.53271103 6.19874634 17.81912994 6.203125 19.14453125 C6.20882507 20.46160568 6.21452515 21.77868011 6.22039795 23.13566589 C6.23090825 25.9274433 6.23675038 28.71919192 6.24023438 31.51098633 C6.24571235 35.08211892 6.26972477 38.65286893 6.29820633 42.22388172 C6.32135532 45.6349242 6.32328419 49.04591428 6.328125 52.45703125 C6.3404718 53.73737747 6.3528186 55.01772369 6.36553955 56.33686829 C6.36253845 57.53128036 6.35953735 58.72569244 6.35644531 59.95629883 C6.36009094 61.00505692 6.36373657 62.053815 6.36749268 63.13435364 C5.93972212 66.47003681 4.99286832 68.31056274 3 71 C-0.51824511 73.34549674 -1.85775694 73.57991403 -6 73 C-8.57285724 70.827365 -10.48996919 69.02006162 -12 66 C-12.11151989 64.11720425 -12.15925845 62.23049454 -12.17700195 60.34448242 C-12.19625481 58.56704903 -12.19625481 58.56704903 -12.21589661 56.75370789 C-12.22328354 55.46728897 -12.23067047 54.18087006 -12.23828125 52.85546875 C-12.246353 51.53839432 -12.25442474 50.22131989 -12.26274109 48.86433411 C-12.27776861 46.07256193 -12.28760613 43.28081521 -12.29516602 40.48901367 C-12.30622376 36.91776696 -12.34061556 33.3471445 -12.38033772 29.77611828 C-12.41281378 26.36509345 -12.41728368 22.95413625 -12.42578125 19.54296875 C-12.44328934 18.26262253 -12.46079742 16.98227631 -12.47883606 15.66313171 C-12.47591049 14.46871964 -12.47298492 13.27430756 -12.4699707 12.04370117 C-12.47583694 10.99494308 -12.48170319 9.946185 -12.48774719 8.86564636 C-11.87596998 5.27129019 -10.49834308 3.6046153 -8 1 C-5.14675563 -0.42662219 -3.16545451 -0.31033868 0 0 Z" fill="#F7FCF9" transform="translate(67,34)" />
            <Path d="M0 0 C3.41796875 1.08203125 3.41796875 1.08203125 5.8125 2.1875 C5.956875 2.97125 6.10125 3.755 6.25 4.5625 C6.69048925 7.15171018 6.69048925 7.15171018 7.8125 9.1875 C8.72802336 15.93948478 8.72802336 15.93948478 6.28515625 19.26953125 C4.52954976 21.03231814 2.78614678 22.67295091 0.8125 24.1875 C0.4825 24.1875 0.1525 24.1875 -0.1875 24.1875 C-0.435 22.929375 -0.6825 21.67125 -0.9375 20.375 C-1.63513972 17.63773303 -2.04866074 16.34617344 -3.9375 14.1875 C-7.00542333 12.82397852 -8.86085882 12.64437491 -12.1875 13.1875 C-15.76730993 15.95708668 -17.05040911 17.45660107 -17.89453125 21.95703125 C-17.95365982 23.30384866 -17.98838987 24.65193526 -18 26 C-18.02513672 26.69287109 -18.05027344 27.38574219 -18.07617188 28.09960938 C-18.13463263 29.79497122 -18.16403047 31.49129287 -18.1875 33.1875 C-19.2930189 32.25159496 -20.39685453 31.31370142 -21.5 30.375 C-22.11488281 29.85292969 -22.72976562 29.33085938 -23.36328125 28.79296875 C-23.96527344 28.26316406 -24.56726562 27.73335937 -25.1875 27.1875 C-25.77917969 26.72988281 -26.37085938 26.27226563 -26.98046875 25.80078125 C-28.1875 24.1875 -28.1875 24.1875 -27.99804688 21.88134766 C-24.92521904 11.66882287 -10.96777908 -1.75304666 0 0 Z" fill="#7CD857" transform="translate(73.1875,21.8125)" />
            <Path d="M0 0 C1.875 1.75 1.875 1.75 3 4 C2.76228868 7.12059329 2.34973644 8.61644289 0.22265625 10.94921875 C-0.49019531 11.52285156 -1.20304687 12.09648437 -1.9375 12.6875 C-3.00291016 13.55955078 -3.00291016 13.55955078 -4.08984375 14.44921875 C-4.72019531 14.96097656 -5.35054687 15.47273438 -6 16 C-6.66 16.66 -7.32 17.32 -8 18 C-8 17.34 -8 16.68 -8 16 C-8.66 15.67 -9.32 15.34 -10 15 C-9.67 13.68 -9.34 12.36 -9 11 C-10.98 11 -12.96 11 -15 11 C-14.34 10.67 -13.68 10.34 -13 10 C-12.71125 9.2575 -12.4225 8.515 -12.125 7.75 C-9.63488936 1.66306287 -6.66502224 -2.11329974 0 0 Z" fill="#52C276" transform="translate(88,13)" />
            <Path d="M0 0 C1.875 1.75 1.875 1.75 3 4 C2.76228868 7.12059329 2.34973644 8.61644289 0.22265625 10.94921875 C-0.49019531 11.52285156 -1.20304687 12.09648437 -1.9375 12.6875 C-3.00291016 13.55955078 -3.00291016 13.55955078 -4.08984375 14.44921875 C-4.72019531 14.96097656 -5.35054687 15.47273438 -6 16 C-6.66 16.66 -7.32 17.32 -8 18 C-8 17.34 -8 16.68 -8 16 C-8.66 15.67 -9.32 15.34 -10 15 C-9.34 14.01 -8.68 13.02 -8 12 C-7.01 12 -6.02 12 -5 12 C-2.22487879 10.39663957 -2.22487879 10.39663957 0 8 C0.50135199 5.37221956 0.50135199 5.37221956 0 3 C-1.04730342 1.753502 -1.04730342 1.753502 -3.35546875 1.65625 C-6.14099363 1.72935839 -6.14099363 1.72935839 -7.80078125 3.96875 C-8.54908203 5.22171875 -8.54908203 5.22171875 -9.3125 6.5 C-9.82425781 7.3353125 -10.33601563 8.170625 -10.86328125 9.03125 C-11.23839844 9.6809375 -11.61351563 10.330625 -12 11 C-12.99 10.67 -13.98 10.34 -15 10 C-14.34 10 -13.68 10 -13 10 C-12.7525 9.278125 -12.505 8.55625 -12.25 7.8125 C-9.56963824 1.78168605 -6.76472719 -2.1449135 0 0 Z" fill="#65CC69" transform="translate(88,13)" />
            <Path d="M0 0 C1.32 0.66 2.64 1.32 4 2 C3.67 2.99 3.34 3.98 3 5 C1.68 4.67 0.36 4.34 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z" fill="#4EC07A" transform="translate(71,28)" />
          </Svg>
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
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
        
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 32,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
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
    paddingHorizontal: 10,
    marginTop: 0,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // marginVertical: 12,
  },
  suggestionButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 12,
    // marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 48,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5AE272',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
  },
});

export default PreChatScreen;
