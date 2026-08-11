import React, { useState, useRef, useEffect } from 'react';
import { Lock, Send, Sparkles, Bot } from 'lucide-react';

export default function ChatInterface({ isUnlocked, userDetails }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Greetings, seeker of cosmic truths. The stars await our communion.'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !isUnlocked) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Placeholder for AI response (in frontend demo)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Ah, I see. The celestial alignment for ${userDetails?.name || 'you'} suggests the answer will reveal itself soon. (Backend API not connected yet)`
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="relative w-full h-full max-h-[600px] flex flex-col rounded-3xl bg-slate-900/40 backdrop-blur-md border border-purple-500/20 shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-purple-500/20 bg-slate-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-300" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">AI Astrologer</h3>
            <div className="flex items-center gap-1.5 text-xs text-purple-300/60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></span>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-purple-600/80 text-white rounded-tr-sm' 
                : 'bg-slate-800/80 text-slate-200 rounded-tl-sm border border-purple-500/10'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950/50 border-t border-purple-500/20">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isUnlocked}
            placeholder={isUnlocked ? "Ask the stars a question..." : "Gather more cosmic energy..."}
            className="w-full bg-slate-900/80 border border-slate-700/50 rounded-full py-3 pl-6 pr-12 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!isUnlocked || !input.trim()}
            className="absolute right-2 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:hover:bg-purple-600 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>

      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 z-10 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-purple-500/30 flex items-center justify-center mb-6 shadow-lg shadow-purple-900/50">
            <Lock className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Chat Locked</h3>
          <p className="text-sm text-purple-200/60 max-w-xs">
            The stars are not yet aligned. Spin the wheel and gather enough cosmic energy to unlock the wisdom of the AI Astrologer.
          </p>
          <div className="mt-8 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Reach the target to unlock
          </div>
        </div>
      )}
    </div>
  );
}
