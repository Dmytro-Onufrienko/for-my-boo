"use client"

import React, { useState, useEffect, useRef } from 'react';

type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

export default function DiaryContent() {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Typewriter state
    const [displayedResponse, setDisplayedResponse] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [pendingResponse, setPendingResponse] = useState(''); // The full text waiting to be typed

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, displayedResponse, isLoading]);

    // Handle Typewriter Effect
    useEffect(() => {
        if (pendingResponse && pendingResponse.length > 0) {
            setDisplayedResponse('');
            setIsTyping(true);
            let currentIndex = 0;

            const typeInterval = setInterval(() => {
                if (currentIndex < pendingResponse.length) {
                    setDisplayedResponse(pendingResponse.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    setIsTyping(false);
                    // Move to history when done
                    setChatHistory(prev => [...prev, { role: 'model', content: pendingResponse }]);
                    setPendingResponse('');
                    setDisplayedResponse('');
                }
            }, 50);

            return () => clearInterval(typeInterval);
        }
    }, [pendingResponse]);

    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading || isTyping) return;

        const userMessage = input.trim();
        setInput('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare history for API (map 'model' to 'model')
            const apiHistory = chatHistory.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: apiHistory
                })
            });

            const data = await res.json();

            if (data.text) {
                setPendingResponse(data.text);
            } else {
                // Fallback
                setPendingResponse("...");
            }
        } catch (error) {
            console.error(error);
            setPendingResponse("Я не можу відповісти зараз...");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col relative">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 custom-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {/* Hide scrollbar for webkit */}
                <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

                {chatHistory.length === 0 && !isTyping && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center opacity-70">
                        <p className="text-gray-700 text-xl font-serif italic mb-6">
                            Напиши щось у щоденник...
                        </p>
                    </div>
                )}

                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`w-full flex ${msg.role === 'user' ? 'justify-center' : 'justify-center'}`}>
                        <div className={`max-w-[90%] text-center ${msg.role === 'user' ? 'text-gray-900 font-semibold' : 'text-gray-800'}`}>
                            <p
                                className={`text-2xl leading-loose ${msg.role === 'model' ? 'italic' : ''}`}
                                style={{
                                    fontFamily: 'var(--font-caveat), cursive',
                                    color: msg.role === 'user' ? '#111' : '#1a1a2e',
                                    whiteSpace: 'pre-line'
                                }}
                            >
                                {msg.content}
                            </p>
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="w-full flex justify-center py-4">
                        <div className="animate-pulse text-gray-500 font-serif italic">...</div>
                    </div>
                )}

                {/* Active Typewriter Response */}
                {isTyping && (
                    <div className="w-full flex justify-center">
                        <div className="max-w-[90%] text-center text-gray-800">
                            <p
                                className="text-2xl leading-loose italic"
                                style={{
                                    fontFamily: 'var(--font-caveat), cursive',
                                    color: '#1a1a2e',
                                    whiteSpace: 'pre-line'
                                }}
                            >
                                {displayedResponse}
                                <span className="animate-pulse">|</span>
                            </p>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 pt-4 pb-2 px-4 border-t border-amber-900/10">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                        placeholder=""
                        disabled={isLoading || isTyping}
                        className="w-full bg-transparent border-b-2 border-gray-400 px-4 py-3 text-gray-900 text-2xl font-serif focus:outline-none focus:border-gray-800 placeholder-gray-400 text-center disabled:opacity-50"
                        style={{ fontFamily: 'var(--font-caveat), cursive' }}
                        autoFocus
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || isTyping || !input.trim()}
                        className="absolute right-0 bottom-3 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
