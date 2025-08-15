'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaPaperPlane, FaArrowLeft, FaBrain, FaRobot } from 'react-icons/fa';
import { BiCode } from 'react-icons/bi';
import { FaChartLine } from 'react-icons/fa';
import { useChat } from '@/hooks/useChat';
import ChatMessage from '@/components/ChatMessage';

interface Message {
  id: string;
  type: 'user' | 'persona' | 'system';
  content: string;
  timestamp: Date;
  personaId?: string;
  personaName?: string;
  isTyping?: boolean;
}

interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
  persona_id?: string;
}

interface ExampleMessage {
  id: string;
  text: string;
  category: 'tech' | 'business' | 'general';
  icon: string;
}

export default function ChatPage() {
  const router = useRouter();
  // const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  // const [isProcessing, setIsProcessing] = useState(false);
  // const [typingPersona, setTypingPersona] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, clearHistory, isProcessing, sendMessage, typingPersona } = useChat()

  const personas: Persona[] = [
    {
      id: 'hitesh',
      name: 'Hitesh Choudhary',
      role: 'Tech Educator',
      avatar: 'images/hitesh-avatar.png',
      color: 'blue'
    },
    {
      id: 'piyush',
      name: 'Piyush Garg',
      role: 'Software Engineer',
      avatar: 'images/piyush-avatar.webp',
      color: 'purple'
    }
  ];

  const exampleMessages: ExampleMessage[] = [
    // Both personas (practical + technical depth)
    {
      id: '1',
      text: 'How do I implement authentication in Next.js?',
      category: 'tech',
      icon: '🔐'
    },
    {
      id: '2',
      text: 'How to build a scalable chat application?',
      category: 'tech',
      icon: '💬'
    },

    // Hitesh-focused (practical, beginner-friendly)
    {
      id: '3',
      text: 'Main coding seekhna chahta hun, kahan se start karun?',
      category: 'tech',
      icon: '🚀'
    },
    {
      id: '4',
      text: 'React mein components kaise banate hain step by step?',
      category: 'tech',
      icon: '⚛️'
    },

    // Piyush-focused (system design, architecture)
    {
      id: '5',
      text: 'How to design a microservices architecture?',
      category: 'tech',
      icon: '🏗️'
    },
    {
      id: '6',
      text: 'Database scaling strategies for high traffic apps?',
      category: 'tech',
      icon: '📊'
    }
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const getPersonaIcon = (personaId: string) => {
    if (personaId === 'hitesh') return <BiCode className="text-lg" />;
    if (personaId === 'piyush') return <FaChartLine className="text-lg" />;
    return <FaRobot className="text-lg" />;
  };

  const getPersonaColor = (personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    return persona?.color || 'gray';
  };

  const handleExampleClick = (exampleText: string) => {
    sendMessage(exampleText.trim())
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    sendMessage(inputValue.trim())
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-[#0a0b0d] text-white flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 mr-4"
          >
            <FaArrowLeft className="text-xl text-gray-400" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FaBrain className="text-xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                Multi<span className="text-blue-400">Mind</span>
              </h1>
              <p className="text-sm text-gray-400">AI Group Chat</p>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full bg-${persona.color}-500/20 border border-${persona.color}-500/30`}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-gray-300">{persona.name}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Scrollable Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 messages-container my-scroll"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <FaBrain className="text-6xl text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-3">Start Your Conversation</h2>
              <p className="text-gray-500 mb-8">Ask anything and our AI experts will respond based on their expertise</p>

              {/* Example Messages */}
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-medium text-gray-400 mb-4">Try asking about:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exampleMessages.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => handleExampleClick(example.text)}
                      className="group p-4 text-left bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/30 hover:border-gray-600/50 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl flex-shrink-0 mt-0.5">{example.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 leading-relaxed">
                            {example.text}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className={`w-2 h-2 rounded-full ${example.category === 'tech' ? 'bg-blue-400' :
                              example.category === 'business' ? 'bg-purple-400' :
                                'bg-green-400'
                              } mr-2`}></div>
                            <span className="text-xs text-gray-500 capitalize">{example.category}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-6">Click any example to get started, or type your own question below</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id}>
              {/* User Message Bubble */}
              {message.type === 'user' && (
                <div className="flex justify-end mb-4">
                  <div className="max-w-xs lg:max-w-2xl">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 rounded-3xl rounded-br-lg shadow-lg">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              )}

              {/* Subtle System Message */}
              {message.type === 'system' && (
                <div className="flex justify-center mb-2">
                  <div className="text-gray-500 text-xs italic">
                    {message.content}
                  </div>
                </div>
              )}

              {/* Persona Message Bubble */}
              {message.type === 'persona' && (
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${getPersonaColor(message.personaId!)}-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    <img
                      src={message.personaId && personas.find(p => p.id === message.personaId)?.avatar}
                      alt={message.personaName}
                      className="w-full h-full rounded-xl object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const icon = getPersonaIcon(message.personaId!);
                        target.parentElement!.innerHTML = '';
                        target.parentElement!.appendChild(document.createElement('div'));
                        target.parentElement!.firstElementChild!.innerHTML = icon.props.children;
                      }}
                    />
                  </div>
                  <ChatMessage
                    getPersonaColor={getPersonaColor}
                    message={message}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Enhanced Typing Indicator */}
          {typingPersona && (
            <div className="flex items-start space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-${getPersonaColor(typingPersona)}-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                <img
                  src={personas.find(p => p.id === typingPersona)?.avatar}
                  alt={personas.find(p => p.id === typingPersona)?.name}
                  className="w-full h-full rounded-xl object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/60 backdrop-blur-sm text-white px-5 py-3 rounded-3xl rounded-tl-lg shadow-lg border border-gray-600/30">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold text-gray-300">
                    {personas.find(p => p.id === typingPersona)?.name}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full bg-${getPersonaColor(typingPersona)}-400 animate-pulse`}></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-t border-gray-700/50 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything to our AI experts..."
                className="w-full px-5 py-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 scrollbar-hide"
                rows={1}
                style={{ minHeight: '56px', maxHeight: '120px', overflow: 'hidden' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="h-14 w-14 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 flex items-center justify-center flex-shrink-0 shadow-lg hover:shadow-blue-500/25 m-2"
            >
              <FaPaperPlane className="text-white text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
