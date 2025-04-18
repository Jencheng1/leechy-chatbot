#!/bin/bash

# Start the Flask backend server
cd /home/ubuntu/rag-faq-chatbot
export OPENAI_API_KEY="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"
python3 chatbot_interface.py &

# Wait for the backend to start
sleep 5

# Start the React Native web app
cd /home/ubuntu/leechy-chatbot
npm run web
