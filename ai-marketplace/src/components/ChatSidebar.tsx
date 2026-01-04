import React, { useState } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSidebarProps {
  query: string;
  theme: 'light' | 'dark';
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ query, theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `I found some great results for "${query}". I can help you compare products, find better deals, or answer any questions about the items you're looking at. What would you like to know?`,
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(inputValue),
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAssistantResponse = (userInput: string): string => {
    const responses = [
      "Based on the products shown, I'd recommend focusing on the highest-rated items with good reviews. Would you like me to highlight the best value options?",
      "I can help you compare these products by features, price, or customer satisfaction. What's most important to you in your decision?",
      "These results show good variety in your price range. Are you looking for any specific features or brand preferences?",
      "I notice some great deals in these results. Would you like me to explain the key differences between the top options?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className={`rounded-lg shadow-sm border h-fit lg:sticky lg:top-24 ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className={`border-b p-4 lg:block hidden ${
        theme === 'dark' ? 'border-gray-700' : 'border-slate-200'
      }`}>
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <h2 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>Shopping Assistant</h2>
        </div>
        <p className={`text-sm mt-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
        }`}>Ask me about these products</p>
      </div>

      {/* Messages */}
      <div className="h-80 sm:h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-slate-100 text-slate-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'assistant' && (
                  <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-blue-100' 
                      : theme === 'dark' 
                        ? 'text-gray-400' 
                        : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`border-t p-4 ${
        theme === 'dark' ? 'border-gray-700' : 'border-slate-200'
      }`}>
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about products..."
            className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'border-slate-200 bg-white text-gray-900 placeholder-gray-500'
            }`}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatSidebar;