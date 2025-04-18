# Leechy AI Chatbot - Deployment and Usage Instructions

## Overview
This document provides instructions for deploying and using the Leechy AI Chatbot, a cross-platform chatbot interface built with React Native and Expo that integrates with a Flask backend for RAG (Retrieval Augmented Generation) functionality.

## Project Structure
- `/src/screens`: Contains the PreChatScreen and ChatScreen components
- `/src/services`: Contains the API service for connecting to the backend
- `/src/assets`: Contains assets like the Leechy icon
- `/dist`: Contains the exported web build

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+ (for the backend)
- OpenAI API key

## Installation

### Frontend (React Native with Expo)
1. Extract the `leechy-chatbot.zip` file
2. Navigate to the extracted directory
3. Install dependencies:
   ```
   npm install
   ```

### Backend (Flask)
1. Navigate to the `rag-faq-chatbot` directory
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set your OpenAI API key:
   ```
   export OPENAI_API_KEY="your-api-key-here"
   ```

## Running the Application

### Development Mode
1. Start the Flask backend:
   ```
   cd rag-faq-chatbot
   python chatbot_interface.py
   ```
2. In a separate terminal, start the React Native frontend:
   ```
   cd leechy-chatbot
   npm run web
   ```

### Using the Start Script
For convenience, you can use the provided start script:
1. Make sure the script is executable:
   ```
   chmod +x start.sh
   ```
2. Run the script:
   ```
   ./start.sh
   ```

## Deployment

### Web Deployment
The project has been exported for web deployment. You can deploy the contents of the `dist` directory to any static web hosting service.

### Mobile Deployment
For mobile deployment, you can build the app using Expo's build service:
```
npx expo build:android
npx expo build:ios
```

## Features
- Pre-chat view with gradient background and suggestion buttons
- Smooth transition to chat view when a suggestion is selected
- Integration with RAG functionality for intelligent responses
- Cross-platform support (web, iOS, Android)
- Fallback responses when backend is unavailable

## Customization
- To modify the suggestion buttons, edit the `SUGGESTIONS` array in `src/screens/PreChatScreen.js`
- To change the styling, modify the `styles` object in each component
- To update the backend URL, edit the `API_BASE_URL` in `src/services/ApiService.js`

## Troubleshooting
- If you encounter CORS issues, make sure your Flask backend has CORS enabled
- If the chatbot doesn't respond, check that your OpenAI API key is valid
- For mobile testing, ensure you're using the correct IP address (10.0.2.2 for Android emulator)

## Credits
- Original RAG implementation: https://github.com/Jencheng1/rag-faq-chatbot
- Design based on provided specifications for Leechy AI Chatbot Interface
