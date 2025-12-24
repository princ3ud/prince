
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { Book, ChatMessage } from '../types';

interface LibrarianChatProps {
  currentBooks: Book[];
}

export const LibrarianChat: React.FC<LibrarianChatProps> = ({ currentBooks }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Welcome to Stellar Archive. I am your neural oracle. Are you looking for a specific tale, or perhaps something exclusive from Princewill Cosmas' private collection?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gemini = useRef(new GeminiService());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await gemini.current.getBookRecommendations(userMsg, currentBooks);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "The archive connection is unstable. I recommend browsing the private collection manually." }]);
  };

  return (
    <div className="flex flex-col h-[520px] bg-[#0d0d0d] border border-indigo-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="bg-indigo-950/20 p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Neural Oracle</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/10 flex gap-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your inquiry..."
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-white placeholder-gray-600"
        />
        <button 
          type="submit"
          disabled={isTyping}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-3 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-900/20"
        >
          Send
        </button>
      </form>
    </div>
  );
};
