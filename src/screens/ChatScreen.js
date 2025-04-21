import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Animated
} from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import Svg, { Path } from 'react-native-svg';
import ApiService from '../services/ApiService';
import Ionicons from '@expo/vector-icons/Ionicons';


const ChatScreen = ({ initialMessage, onClose }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Add initial bot greeting
    setMessages([
      { id: 'greeting', text: "Hi there! 👋 I'm Leechy's AI Chatbot. How can I help you today?", isUser: false }
    ]);
    
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // If there's an initial message from suggestion, process it
    if (initialMessage) {
      handleSendMessage(initialMessage, true);
    }
  }, []);

  const handleSendMessage = async (text, isInitial = false) => {
    const messageToSend = isInitial ? text : inputText;
    
    if (!messageToSend.trim()) return;
    
    // Add user message
    const userMessage = { id: Date.now().toString(), text: messageToSend, isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    if (!isInitial) {
      setInputText('');
    }
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Call the API service to get a response using RAG
      const response = await ApiService.sendMessage(messageToSend);
      
      // Add bot response
      const botMessage = { 
        id: (Date.now() + 1).toString(), 
        text: response.answer || "I'm sorry, I couldn't process your request at this time.", 
        isUser: false 
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback responses if API fails
      let botResponse;
      
      if (messageToSend.toLowerCase().includes('local pickup')) {
        botResponse = "Yes, you can offer local pickup! When listing your item, select 'Local Pickup' as a delivery option and specify your preferred location.";
      } else if (messageToSend.toLowerCase().includes('cancel')) {
        botResponse = "You can cancel a booking up to 24 hours before the rental period starts. Go to 'My Rentals' in your profile, select the booking, and click 'Cancel Booking'.";
      } else if (messageToSend.toLowerCase().includes('ideas to rent')) {
        botResponse = "Popular items to rent include power tools, camping gear, party supplies, photography equipment, and designer clothing. Think about items you use occasionally but don't need to own!";
      } else if (messageToSend.toLowerCase().includes('deliver')) {
        botResponse = "To deliver an item, you can choose between shipping or local pickup. For shipping, package your item securely and use the shipping label provided in your dashboard.";
      } else if (messageToSend.toLowerCase().includes('damaged')) {
        botResponse = "If an item is damaged during rental, please document it with photos and report it through the app within 24 hours of return. Our protection policy covers most damages.";
      } else if (messageToSend.toLowerCase().includes('clean')) {
        botResponse = "Yes, items should be returned in the same condition they were received. Basic cleaning is expected, but check the listing for any specific cleaning requirements.";
      } else if (messageToSend.toLowerCase().includes('trending')) {
        botResponse = "Currently trending items include electric bikes, camping equipment, high-end cameras, and party supplies. Check the 'Trending Now' section on the homepage for more!";
      } else if (messageToSend.toLowerCase().includes('storage')) {
        botResponse = "We don't directly provide storage space, but you can list unused space in your home or garage for rent on Leechy! Many users rent out basement or garage space.";
      } else if (messageToSend.toLowerCase().includes('payout')) {
        botResponse = "Your payout will arrive within 2 to 3 business days after the rental period ends, assuming there are no reported issues with the item.";
      } else {
        botResponse = "I'm here to help with any questions about Leechy's rental marketplace. You can ask about listing items, renting, payments, or policies!";
      }
      
      // Add fallback bot response
      const botMessage = { id: (Date.now() + 1).toString(), text: botResponse, isUser: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessages = () => {
    return messages.map(message => (
      <View 
        key={message.id} 
        style={[
          styles.messageBubble, 
          message.isUser ? styles.userBubble : styles.botBubble
        ]}
      >
        {/* {!message.isUser && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>L</Text>
          </View>
        )} */}

        {!message.isUser && (
          <View style={styles.botAvatar}>
            <Svg width="100%" height="100%" viewBox="0 0 128 128">
              <Path
                d="M0 0 C42.24 0 84.48 0 128 0 C128 42.24 128 84.48 128 128 C85.76 128 43.52 128 0 128 C0 85.76 0 43.52 0 0 Z"
                fill="#3FB884"
              />
              <Path
                d="M0 0 C2.69990662 1.79993774 4.5418865 3.083773 6 6 C6.10642856 7.8829321 6.14882656 9.76962021 6.16113281 11.65551758 C6.17074036 12.84047318 6.1803479 14.02542877 6.19024658 15.24629211 C6.19449646 16.53271103 6.19874634 17.81912994 6.203125 19.14453125 C6.20882507 20.46160568 6.21452515 21.77868011 6.22039795 23.13566589 C6.23090825 25.9274433 6.23675038 28.71919192 6.24023438 31.51098633 C6.24571235 35.08211892 6.26972477 38.65286893 6.29820633 42.22388172 C6.32135532 45.6349242 6.32328419 49.04591428 6.328125 52.45703125 C6.3404718 53.73737747 6.3528186 55.01772369 6.36553955 56.33686829 C6.36253845 57.53128036 6.35953735 58.72569244 6.35644531 59.95629883 C6.36009094 61.00505692 6.36373657 62.053815 6.36749268 63.13435364 C5.93972212 66.47003681 4.99286832 68.31056274 3 71 C-0.51824511 73.34549674 -1.85775694 73.57991403 -6 73 C-8.57285724 70.827365 -10.48996919 69.02006162 -12 66 C-12.11151989 64.11720425 -12.15925845 62.23049454 -12.17700195 60.34448242 C-12.19625481 58.56704903 -12.19625481 58.56704903 -12.21589661 56.75370789 C-12.22328354 55.46728897 -12.23067047 54.18087006 -12.23828125 52.85546875 C-12.246353 51.53839432 -12.25442474 50.22131989 -12.26274109 48.86433411 C-12.27776861 46.07256193 -12.28760613 43.28081521 -12.29516602 40.48901367 C-12.30622376 36.91776696 -12.34061556 33.3471445 -12.38033772 29.77611828 C-12.41281378 26.36509345 -12.41728368 22.95413625 -12.42578125 19.54296875 C-12.44328934 18.26262253 -12.46079742 16.98227631 -12.47883606 15.66313171 C-12.47591049 14.46871964 -12.47298492 13.27430756 -12.4699707 12.04370117 C-12.47583694 10.99494308 -12.48170319 9.946185 -12.48774719 8.86564636 C-11.87596998 5.27129019 -10.49834308 3.6046153 -8 1 C-5.14675563 -0.42662219 -3.16545451 -0.31033868 0 0 Z"
                fill="#F7FCF9"
                transform="translate(67,34)"
              />
              <Path
                d="M0 0 C3.41796875 1.08203125 3.41796875 1.08203125 5.8125 2.1875 C5.956875 2.97125 6.10125 3.755 6.25 4.5625 C6.69048925 7.15171018 6.69048925 7.15171018 7.8125 9.1875 C8.72802336 15.93948478 8.72802336 15.93948478 6.28515625 19.26953125 C4.52954976 21.03231814 2.78614678 22.67295091 0.8125 24.1875 C0.4825 24.1875 0.1525 24.1875 -0.1875 24.1875 C-0.435 22.929375 -0.6825 21.67125 -0.9375 20.375 C-1.63513972 17.63773303 -2.04866074 16.34617344 -3.9375 14.1875 C-7.00542333 12.82397852 -8.86085882 12.64437491 -12.1875 13.1875 C-15.76730993 15.95708668 -17.05040911 17.45660107 -17.89453125 21.95703125 C-17.95365982 23.30384866 -17.98838987 24.65193526 -18 26 C-18.02513672 26.69287109 -18.05027344 27.38574219 -18.07617188 28.09960938 C-18.13463263 29.79497122 -18.16403047 31.49129287 -18.1875 33.1875 Z"
                fill="#7CD857"
                transform="translate(73.1875,21.8125)"
              />
              {/* …add any other <Path> elements here… */}
            </Svg>
        </View>
        )}

        <View style={[
          styles.messageContent,
          message.isUser ? styles.userContent : styles.botContent
        ]}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    ));
  };

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Leechy Support</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {renderMessages()}
          
          {isTyping && (
            <View style={[styles.messageBubble, styles.botBubble]}>
              <View style={styles.botAvatar}>
                <Text style={styles.botAvatarText}>L</Text>
              </View>
              <View style={[styles.messageContent, styles.botContent]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            returnKeyType="send"
            onSubmitEditing={() => handleSendMessage()}
          />
          {/* <TouchableOpacity 
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled
            ]} 
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#999',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  messagesContent: {
    paddingBottom: 10,
    width: '100%',
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 10,
    maxWidth: '80%',
    minWidth: 60,
  },
  userBubble: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  botBubble: {
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#5AE272',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  botAvatarText: {
    color: 'white',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  messageContent: {
    padding: 12,
    borderRadius: 18,
    flexShrink: 1,
  },
  userContent: {
    backgroundColor: '#5AE272',
    borderBottomRightRadius: 5,
    maxWidth: '100%',
  },
  botContent: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 5,
    maxWidth: '100%',
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 50,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
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
});

export default ChatScreen;
