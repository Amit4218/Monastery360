import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiMessageCircle, FiX, FiSend, FiUser, FiBot, FiMic, FiMicOff, 
  FiRefreshCw, FiBookmark, FiShare2, FiDownload, FiStar, FiThumbsUp, FiThumbsDown,
  FiHelpCircle, FiCalendar, FiMap, FiCamera, FiBook, FiSettings, FiMinimize, FiMaximize2
} = FiIcons;

function EnhancedAIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Namaste! 🙏 I\'m your enhanced monastery guide AI assistant. I can help you with detailed information about monasteries, plan your spiritual journey, book tours, answer cultural questions, and much more. How may I assist you today?',
      timestamp: new Date().toISOString(),
      category: 'greeting',
      helpful: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatMode, setChatMode] = useState('general');
  const [savedMessages, setSavedMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced Quick Actions with categories
  const quickActionCategories = {
    popular: [
      { text: 'Tell me about Rumtek Monastery', icon: '🏛️', category: 'monastery' },
      { text: 'Plan a 3-day monastery tour', icon: '📅', category: 'booking' },
      { text: 'What meditation practices are available?', icon: '🧘', category: 'spiritual' },
      { text: 'Best time to visit Sikkim monasteries', icon: '🌤️', category: 'travel' }
    ],
    monasteries: [
      { text: 'Compare Rumtek vs Enchey Monastery', icon: '⚖️', category: 'monastery' },
      { text: 'Monastery architecture styles', icon: '🏗️', category: 'cultural' },
      { text: 'Photography rules in monasteries', icon: '📸', category: 'guidelines' },
      { text: 'Virtual tour of Pemayangtse', icon: '🎮', category: 'virtual' }
    ],
    spiritual: [
      { text: 'Buddhist philosophy basics', icon: '☸️', category: 'philosophy' },
      { text: 'Meditation techniques for beginners', icon: '🧘‍♂️', category: 'meditation' },
      { text: 'Prayer wheel significance', icon: '☸️', category: 'cultural' },
      { text: 'Tibetan Buddhism traditions', icon: '📿', category: 'religion' }
    ],
    practical: [
      { text: 'Book a monastery homestay', icon: '🏠', category: 'booking' },
      { text: 'Transportation to monasteries', icon: '🚗', category: 'travel' },
      { text: 'Festival calendar 2024', icon: '🎉', category: 'events' },
      { text: 'Dress code and etiquette', icon: '👕', category: 'guidelines' }
    ]
  };

  const [activeQuickCategory, setActiveQuickCategory] = useState('popular');

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

  // Enhanced AI response generation
  const generateEnhancedAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Booking and Planning Queries
    if (message.includes('plan') || message.includes('tour') || message.includes('itinerary')) {
      return {
        content: `I'd be happy to help you plan your monastery tour! 📅

**Popular Tour Options:**
🔸 **Day Tour (8 hours)**: Rumtek → Enchey → Do-drul Chorten
   • Price: ₹2,500/person | Includes: Guide + Transport + Lunch
   
🔸 **Weekend Retreat (2 days)**: Pemayangtse → Tashiding
   • Price: ₹8,000/person | Includes: Accommodation + Meals + Meditation
   
🔸 **Photography Tour (3 days)**: Multiple monasteries
   • Price: ₹12,000/person | Includes: Pro guide + Equipment + Permits

**What I need to customize your tour:**
• How many days do you have?
• Your interests (meditation, photography, architecture)?
• Group size and budget range?
• Preferred accommodation level?

Would you like me to create a personalized itinerary for you?`,
        category: 'booking',
        actions: ['Book Tour', 'View Packages', 'Custom Itinerary']
      };
    }

    // Specific Monastery Queries
    if (message.includes('rumtek')) {
      return {
        content: `**Rumtek Monastery - The Dharma Chakra Centre** 🏛️

**Key Information:**
• **Location**: 24km from Gangtok, East Sikkim (27.2887° N, 88.5615° E)
• **Established**: 1966 (rebuilt from 16th century original)
• **Tradition**: Kagyu school of Tibetan Buddhism
• **Significance**: Main seat of the Karmapa in exile

**What Makes It Special:**
🔹 **Golden Stupa**: Contains precious relics and sacred texts
🔹 **Prayer Wheels**: 108 wheels containing millions of mantras
🔹 **Architecture**: Perfect blend of Tibetan and Sikkimese styles
🔹 **Monastery Museum**: Rare artifacts and thangkas

**Visitor Information:**
• **Timings**: 6:00 AM - 6:00 PM daily
• **Best Time**: Early morning (7-9 AM) or evening prayers (5-6 PM)
• **Entry**: Free, donations welcome
• **Photography**: Allowed in courtyard, restricted inside halls

**Virtual Tour Available**: Experience 360° views online
**Audio Guide**: 15-minute narrated tour in multiple languages

Would you like specific information about visiting, booking a tour, or learning about the spiritual practices here?`,
        category: 'monastery',
        actions: ['Book Visit', 'Virtual Tour', 'More Details', 'Get Directions']
      };
    }

    // Default enhanced response
    return {
      content: `Thank you for your question! I'm here to provide comprehensive assistance with all aspects of Sikkim's monasteries and Buddhist culture.

**I can help you with:**

🏛️ **Detailed Monastery Information**
• History, architecture, significance of 200+ monasteries
• Real-time visiting information and guidelines
• Comparative analysis of different monasteries

🎯 **Personalized Trip Planning**  
• Custom itineraries based on your interests
• Budget planning and cost optimization
• Seasonal recommendations and weather updates

📅 **Booking & Reservations**
• Tour packages and guided visits
• Accommodation from budget to luxury
• Transportation arrangements

🧘‍♂️ **Spiritual & Cultural Guidance**
• Meditation techniques and philosophy
• Festival calendars and cultural events
• Proper etiquette and respectful practices

What specific aspect would you like to explore in detail?`,
      category: 'general',
      actions: ['Monastery Guide', 'Plan Trip', 'Book Tour', 'Virtual Experience']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      category: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponseData = generateEnhancedAIResponse(inputMessage);
      const aiResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponseData.content,
        timestamp: new Date().toISOString(),
        category: aiResponseData.category,
        actions: aiResponseData.actions,
        helpful: null
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

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

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
        content: 'Chat cleared! I\'m here to help you with monastery information, trip planning, bookings, and spiritual guidance. What would you like to explore?',
        timestamp: new Date().toISOString(),
        category: 'greeting'
      }
    ]);
  };

  const saveMessage = (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setSavedMessages(prev => [...prev, message]);
    }
  };

  const markHelpful = (messageId, helpful) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
  };

  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      totalMessages: messages.length
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monastery-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button with Professional Design */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-r from-monastery-600 to-tibetan-gold hover:from-monastery-700 hover:to-monastery-600'
          }`}
        >
          {/* Notification Badge */}
          {isTyping && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
            >
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </motion.div>
          )}
          
          {/* AI Status Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          
          <SafeIcon 
            icon={isOpen ? FiX : FiMessageCircle} 
            className="w-8 h-8 text-white" 
          />
        </motion.button>

        {/* Floating Action Hints */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          >
            Ask me anything about monasteries! 💬
          </motion.div>
        )}
      </motion.div>

      {/* Professional Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 700
            }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className={`fixed bottom-24 right-6 z-40 w-[420px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden backdrop-blur-xl`}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              height: isMinimized ? '60px' : '700px'
            }}
          >
            {/* Professional Header */}
            <div className="bg-gradient-to-r from-monastery-600 via-monastery-700 to-tibetan-gold p-4 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <SafeIcon icon={FiBot} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Monastery AI</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs opacity-90">Online & Ready to Help</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                    title={isMinimized ? "Expand" : "Minimize"}
                  >
                    <SafeIcon icon={isMinimized ? FiMaximize2 : FiMinimize} className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={exportChat}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                    title="Export Chat"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearChat}
                    className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/20"
                    title="Clear Chat"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Chat Mode Selector */}
              {!isMinimized && (
                <div className="flex space-x-1 bg-black/20 rounded-xl p-1 mt-3 backdrop-blur-sm">
                  {['general', 'booking', 'cultural'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setChatMode(mode)}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                        chatMode === mode 
                          ? 'bg-white/30 text-white shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {mode === 'general' && '🤖'}
                      {mode === 'booking' && '📅'}
                      {mode === 'cultural' && '🏛️'}
                      <span className="ml-1 capitalize">{mode}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!isMinimized && (
              <>
                {/* Enhanced Quick Actions */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex space-x-1 mb-3 overflow-x-auto">
                    {Object.keys(quickActionCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveQuickCategory(category)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                          activeQuickCategory === category
                            ? 'bg-monastery-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-monastery-50 dark:hover:bg-monastery-900/20 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        {category === 'popular' && '⭐'}
                        {category === 'monasteries' && '🏛️'}
                        {category === 'spiritual' && '🧘'}
                        {category === 'practical' && '🎯'}
                        <span className="ml-1 capitalize">{category}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {quickActionCategories[activeQuickCategory].map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAction(action.text)}
                        className="text-xs bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-xl hover:bg-monastery-50 dark:hover:bg-monastery-900/20 transition-all duration-200 flex items-center space-x-2 shadow-sm border border-gray-200 dark:border-gray-600"
                      >
                        <span>{action.icon}</span>
                        <span className="truncate">{action.text.split(' ').slice(0, 3).join(' ')}...</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                          message.type === 'user' 
                            ? 'bg-gradient-to-br from-monastery-600 to-tibetan-gold text-white' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800'
                        }`}>
                          <SafeIcon icon={message.type === 'user' ? FiUser : FiBot} className="w-4 h-4" />
                        </div>
                        
                        <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-monastery-600 to-monastery-700 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}>
                          <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                          
                          {/* Enhanced Action Buttons for Bot Messages */}
                          {message.type === 'bot' && message.actions && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {message.actions.map((action, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleQuickAction(action)}
                                  className="bg-monastery-600 hover:bg-monastery-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            <p className={`text-xs opacity-70 ${
                              message.type === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            
                            {/* Enhanced Message Actions */}
                            {message.type === 'bot' && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => saveMessage(message.id)}
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                  title="Save Message"
                                >
                                  <SafeIcon icon={FiBookmark} className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => markHelpful(message.id, true)}
                                  className={`p-1 rounded-lg transition-colors duration-200 ${
                                    message.helpful === true ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                  title="Helpful"
                                >
                                  <SafeIcon icon={FiThumbsUp} className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => markHelpful(message.id, false)}
                                  className={`p-1 rounded-lg transition-colors duration-200 ${
                                    message.helpful === false ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                  title="Not Helpful"
                                >
                                  <SafeIcon icon={FiThumbsDown} className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Enhanced Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
                          <SafeIcon icon={FiBot} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex space-x-2 items-center">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-monastery-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-monastery-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-monastery-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 ml-2">AI is thinking...</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Professional Input Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about monasteries, booking, or cultural information..."
                        rows={1}
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-monastery-500 focus:border-monastery-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-300 shadow-inner"
                        style={{ minHeight: '48px', maxHeight: '96px' }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startVoiceRecognition}
                        disabled={isListening}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                            : 'text-gray-400 hover:text-monastery-600 hover:bg-monastery-50 dark:hover:bg-monastery-900/20'
                        }`}
                      >
                        <SafeIcon icon={isListening ? FiMicOff : FiMic} className="w-4 h-4" />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="w-12 h-12 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:scale-100"
                    >
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Professional Chat Statistics */}
                  <div className="flex justify-between items-center mt-3 px-2">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>{messages.length} messages</span>
                      </span>
                      <span>Enhanced AI • Always Learning</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Press Enter to send
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EnhancedAIChatbox;