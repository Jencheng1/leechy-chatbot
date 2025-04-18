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
import ApiService from '../services/ApiService';

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
        {!message.isUser && (
          <View style={styles.botAvatar}>
            <Text style={styles.botAvatarText}>L</Text>
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
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={() => handleSendMessage()}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>✈️</Text>
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
  },
  messagesContent: {
    paddingBottom: 10,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 10,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  botBubble: {
    alignSelf: 'flex-start',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  },
  userContent: {
    backgroundColor: '#5AE272',
    borderBottomRightRadius: 5,
  },
  botContent: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#333',
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
  sendButtonText: {
    fontSize: 20,
  },
});

export default ChatScreen;
