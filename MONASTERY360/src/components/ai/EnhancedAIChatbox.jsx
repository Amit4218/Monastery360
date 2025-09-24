import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SafeIcon from "../common/SafeIcon";
import * as FiIcons from "react-icons/fi";

const {
  FiMessageCircle,
  FiX,
  FiSend,
  FiUser,
  FiBot,
  FiMic,
  FiMicOff,
  FiRefreshCw,
  FiBookmark,
  FiDownload,
  FiThumbsUp,
  FiThumbsDown,
  FiMinimize,
  FiMaximize2,
} = FiIcons;

function EnhancedAIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Namaste! 🙏 I'm your enhanced monastery guide AI assistant. I can help you with detailed information about monasteries, plan your spiritual journey, book tours, answer cultural questions, and much more. How may I assist you today?",
      timestamp: new Date().toISOString(),
      category: "greeting",
      helpful: null,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [savedMessages, setSavedMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll chat to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ✅ Send user message to backend AI route
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
      category: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      const data = await res.json();

      const aiResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: data.response.replace(/^\*\s?/gm, "", " ") || "⚠️ No response from AI",
        timestamp: new Date().toISOString(),
        category: "ai",
        helpful: null,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      const errorResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: "❌ Error connecting to AI service. Please try again later.",
        timestamp: new Date().toISOString(),
        category: "error",
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (text) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Voice input
  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

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
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "bot",
        content:
          "Chat cleared! I'm here to help you with monastery information, trip planning, bookings, and spiritual guidance. What would you like to explore?",
        timestamp: new Date().toISOString(),
        category: "greeting",
      },
    ]);
  };

  const saveMessage = (messageId) => {
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      setSavedMessages((prev) => [...prev, message]);
    }
  };

  const markHelpful = (messageId, helpful) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, helpful } : msg))
    );
  };

  const exportChat = () => {
    const chatData = {
      timestamp: new Date().toISOString(),
      messages: messages,
      totalMessages: messages.length,
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `monastery-chat-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-monastery-600 to-tibetan-gold hover:from-monastery-700 hover:to-monastery-600"
          }`}
        >
          <SafeIcon
            icon={isOpen ? FiX : FiMessageCircle}
            className="w-8 h-8 text-white"
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-[420px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
            style={{ height: isMinimized ? "60px" : "700px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-monastery-600 via-monastery-700 to-tibetan-gold p-4 text-white flex items-center justify-between">
              <h3 className="font-bold text-lg">Monastery AI</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2"
                >
                  <SafeIcon
                    icon={isMinimized ? FiMaximize2 : FiMinimize}
                    className="w-4 h-4"
                  />
                </motion.button>
                <motion.button onClick={exportChat} className="p-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                </motion.button>
                <motion.button onClick={clearChat} className="p-2">
                  <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-12">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                          message.type === "user"
                            ? "bg-gradient-to-br from-monastery-600 to-monastery-700 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">
                          {message.content}
                        </p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start text-gray-500 text-sm">
                      AI is typing...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-3">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about monasteries..."
                    rows={1}
                    className="flex-1 px-4 py-2 border rounded-xl resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="w-12 h-12 bg-gradient-to-r from-monastery-600 to-tibetan-gold text-white rounded-xl flex items-center justify-center"
                  >
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                  </motion.button>
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
