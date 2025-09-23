import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiX, FiSend, FiUser, FiBot, FiMic, FiMicOff, FiRefreshCw } = FiIcons;

function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your monastery guide AI assistant. I can help you with information about monasteries, Buddhist culture, meditation practices, festivals, and planning your spiritual journey. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Quick action suggestions
  const quickActions = [
    { text: 'Tell me about Rumtek Monastery', icon: '🏛️' },
    { text: 'What are the meditation practices?', icon: '🧘' },
    { text: 'When is the next festival?', icon: '🎉' },
    { text: 'How to plan a monastery visit?', icon: '📅' },
    { text: 'Buddhist philosophy basics', icon: '📚' },
    { text: 'Virtual tour guide', icon: '🎮' }
  ];

  // Simulate AI responses based on keywords
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Monastery information responses
    if (message.includes('rumtek')) {
      return 'Rumtek Monastery is the largest monastery in Sikkim and the main seat of the Karmapa. Built in the 1960s, it follows the Kagyu tradition of Tibetan Buddhism. The monastery features beautiful architecture, houses precious relics, and offers stunning views of the surrounding mountains. Would you like to know about visiting hours or specific ceremonies?';
    }
    
    if (message.includes('enchey')) {
      return 'Enchey Monastery is one of the most important monasteries in Gangtok, belonging to the Nyingma tradition. Established in 1840, it\'s known for its annual Cham dance performances and beautiful murals. The monastery offers panoramic views of the Kanchenjunga range. It\'s easily accessible and perfect for first-time visitors.';
    }
    
    if (message.includes('pemayangtse')) {
      return 'Pemayangtse Monastery is one of the oldest and most significant monasteries in Sikkim, built in 1705. It belongs to the Nyingma school and is famous for its wooden sculptures and ancient texts. Located in West Sikkim, it offers breathtaking Himalayan views. The monastery has a unique seven-tiered wooden sculpture depicting the celestial palace of Guru Rinpoche.';
    }
    
    // Meditation and spiritual practices
    if (message.includes('meditation') || message.includes('practice')) {
      return 'Buddhist meditation practices in Sikkimese monasteries include:\n\n🧘 **Shamatha** - Calm abiding meditation\n🧘 **Vipassana** - Insight meditation\n🧘 **Metta** - Loving-kindness meditation\n🧘 **Mantra recitation** - Sacred sound practices\n🧘 **Walking meditation** - Mindful movement\n\nMany monasteries offer guided sessions for visitors. Would you like specific timings or how to participate?';
    }
    
    // Festival information
    if (message.includes('festival') || message.includes('celebration')) {
      return 'Major Buddhist festivals in Sikkim monasteries:\n\n🎉 **Losar** (Feb/Mar) - Tibetan New Year\n🎉 **Buddha Purnima** (May) - Buddha\'s birthday\n🎉 **Saga Dawa** (Jun) - Month of merit\n🎉 **Drupka Teshi** (Aug) - First teaching\n🎉 **Lhabab Duchen** (Nov) - Buddha\'s descent\n\nEach festival features special prayers, traditional dances, and cultural performances. Which festival interests you most?';
    }
    
    // Planning and visiting
    if (message.includes('visit') || message.includes('plan') || message.includes('trip')) {
      return 'Here\'s how to plan your monastery visit:\n\n📅 **Best time**: March-May, September-November\n👕 **Dress code**: Modest clothing, remove shoes inside\n⏰ **Timing**: Most open 6 AM - 6 PM\n📸 **Photography**: Ask permission, some areas restricted\n🤫 **Etiquette**: Maintain silence in prayer halls\n🎒 **Essentials**: Comfortable shoes, water, respect\n\nWould you like specific monastery recommendations or transportation details?';
    }
    
    // Philosophy and teachings
    if (message.includes('philosophy') || message.includes('teaching') || message.includes('buddhism')) {
      return 'Buddhist philosophy key concepts:\n\n☸️ **Four Noble Truths** - Understanding suffering\n☸️ **Eightfold Path** - Path to enlightenment\n☸️ **Karma** - Law of cause and effect\n☸️ **Impermanence** - Everything changes\n☸️ **Compassion** - Love for all beings\n☸️ **Mindfulness** - Present moment awareness\n\nSikkimese monasteries preserve these ancient teachings. Would you like to explore any specific concept?';
    }
    
    // Virtual tour
    if (message.includes('virtual') || message.includes('tour') || message.includes('online')) {
      return 'Our virtual monastery tours offer:\n\n🎮 **360° immersive experiences**\n🎧 **Audio guides in multiple languages**\n📱 **Interactive hotspots**\n🏛️ **Detailed architecture views**\n📿 **Sacred artifact close-ups**\n🎵 **Traditional chanting audio**\n\nYou can explore Rumtek, Enchey, and Pemayangtse monasteries virtually. Which one would you like to start with?';
    }
    
    // Accommodation and travel
    if (message.includes('stay') || message.includes('hotel') || message.includes('accommodation')) {
      return 'Accommodation options near monasteries:\n\n🏠 **Monastery guest houses** - Authentic experience\n🏨 **Heritage hotels** - Luxury with culture\n🏡 **Local homestays** - Family atmosphere\n⛺ **Eco-resorts** - Nature immersion\n\nMany offer meditation sessions and cultural programs. Would you like specific recommendations or booking assistance?';
    }
    
    // General help
    if (message.includes('help') || message.includes('assist')) {
      return 'I can help you with:\n\n🏛️ **Monastery information** - History, architecture, significance\n🧘 **Spiritual practices** - Meditation, rituals, ceremonies\n🎉 **Festivals & events** - Dates, celebrations, participation\n📅 **Visit planning** - Itineraries, timing, preparation\n🎮 **Virtual experiences** - Online tours, digital archives\n🏠 **Accommodation** - Stays, booking, recommendations\n\nWhat specific topic interests you most?';
    }
    
    // Default response
    return 'Thank you for your question! I specialize in Sikkim\'s monasteries and Buddhist culture. I can provide information about:\n\n• Monastery details and history\n• Meditation and spiritual practices\n• Festival dates and celebrations\n• Visit planning and preparation\n• Virtual tours and experiences\n• Cultural insights and philosophy\n\nCould you please be more specific about what you\'d like to know?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (text) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Chat cleared! I\'m here to help you with monastery information, Buddhist culture, and spiritual guidance. What would you like to know?',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-monastery-600 to-tibetan-gold hover:from-monastery-700 hover:to-monastery-600'
        }`}
      >
        <SafeIcon 
          icon={isOpen ? FiX : FiMessageCircle} 
          className="w-6 h-6 text-white" 
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-monastery-600 to-tibetan-gold p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiBot} className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Monastery Guide AI</h3>
                    <p className="text-xs opacity-80">Your spiritual journey assistant</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearChat}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {quickActions.slice(0, 3).map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action.text)}
                    className="text-xs bg-monastery-50 dark:bg-monastery-900/20 text-monastery-700 dark:text-monastery-300 px-3 py-2 rounded-full hover:bg-monastery-100 dark:hover:bg-monastery-900/40 transition-colors duration-200"
                  >
                    {action.icon} {action.text.split(' ').slice(0, 3).join(' ')}...
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-monastery-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      <SafeIcon icon={message.type === 'user' ? FiUser : FiBot} className="w-4 h-4" />
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-monastery-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiBot} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about monasteries..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-monastery-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    style={{ minHeight: '48px', maxHeight: '96px' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={startVoiceRecognition}
                    disabled={isListening}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'text-gray-400 hover:text-monastery-600'
                    }`}
                  >
                    <SafeIcon icon={isListening ? FiMicOff : FiMic} className="w-4 h-4" />
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <SafeIcon icon={FiSend} className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChatbox;