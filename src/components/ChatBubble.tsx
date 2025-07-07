import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Zap, Code, Mail, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import ChatMessageContent from './ChatMessageContent';

interface ChatMessage {
  type: 'user' | 'api';
  text: string;
}

const ENCRYPTION_KEY = import.meta.env.VITE_CHAT_ENCRYPTION_KEY || 'super-secret-key'; // Use environment variable for key

const encryptData = (data: ChatMessage[]): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData: string): ChatMessage[] | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      const decryptedMessages = decryptData(savedMessages);
      if (decryptedMessages) {
        return decryptedMessages;
      }
    }
    return [{ type: 'api', text: '👋 Hi! I\'m Riski. What would you like to know?' }];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [clickedQuestionId, setClickedQuestionId] = useState<string | null>(null); // New state
  const chatContentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatHistory', encryptData(messages));
  }, [messages]);

  const quickQuestions = [
    {
      id: 'skills',
      icon: Code,
      text: '💼 What are your main skills?',
      answer: 'I specialize in Backend Development with Node.js, Express.js, PostgreSQL, and React.js for full-stack solutions!'
    },
    {
      id: 'projects',
      icon: Zap,
      text: '🚀 Show me your best projects',
      answer: 'Check out Skypedia (flight booking), FancyTodo (task management), and my E-commerce platform in the projects section!'
    },
    {
      id: 'availability',
      icon: Mail,
      text: '📅 Are you available for work?',
      answer: 'Yes! I\'m open for freelance projects and remote work opportunities. Let\'s discuss your project!'
    }
  ];

  const handleQuestionClick = (question: typeof quickQuestions[0]) => {
    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: question.text }]);
    setMessages((prevMessages) => [...prevMessages, { type: 'api', text: question.answer }]);
    setClickedQuestionId(question.id); // Set the clicked question ID
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage: ChatMessage = { type: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await axios.post('http://localhost:3000/api/send-to-friend', {
        input: inputMessage,
      });
      const apiResponse: ChatMessage = { type: 'api', text: response.data.data.output };
      setMessages((prevMessages) => [...prevMessages, apiResponse]);
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: 'api',
          text: `Error: ${
            error && typeof error === 'object' && 'message' in error
              ? (error as { message?: string }).message
              : 'Could not send message.'
          }`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{ type: 'api', text: '👋 Hi! I\'m Riski. What would you like to know?' }]);
    localStorage.removeItem('chatHistory');
    setClickedQuestionId(null);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-purple-500 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">R</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Riski Dwi Patrio</h3>
                  <p className="text-white/80 text-sm">Backend Developer</p>
                </div>
              </div>
              <button onClick={handleClearChat} className="text-white/80 hover:text-white transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div ref={chatContentRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-3 max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white ml-auto rounded-br-none' : 'bg-gray-800 text-white rounded-bl-none'}`}
                  >
                    <ChatMessageContent text={message.text} />
                  </div>
                ))}
                {isSending && (
                  <div className="bg-gray-800 text-white rounded-2xl p-3 max-w-[80%] rounded-bl-none">
                    <p className="text-sm animate-pulse">Typing...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Questions */}
            <div className={`${messages.length <= 1 ?'p-4 border-t': ''}  border-gray-700 space-y-2`}>
              {messages.length <= 1 && quickQuestions.map((question) => ( // Only show quick questions initially
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className={`w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors ${clickedQuestionId === question.id ? 'border-transparent' : 'border border-gray-700 hover:border-orange-500/50'}`}
                >
                  <div className="flex items-center space-x-2">
                    <question.icon className="h-4 w-4 text-orange-400" />
                    <span className="text-white text-sm">{question.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer - Input and Send */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={isSending ? 'Sending...' : 'Type a message...'}
                  className="flex-1 bg-gray-800 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isSending) {
                      handleSendMessage();
                    }
                  }}
                  disabled={isSending}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-orange-500 hover:bg-orange-400 rounded-xl p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSending}
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBubble;