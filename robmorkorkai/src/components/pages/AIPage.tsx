import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { TopNavbar } from "../layout/TopNavbar";
import { BottomNav } from "../layout/BottomNav";
import { useAuth } from "../../context/AuthContext";

import { AIResultCard } from "../ai/AIResultCard";
import { AIEmptyState } from "../ai/AIEmptyState";
import { AIChatInput } from "../ai/AIChatInput";

// --- Mock Data ---
const mockResults = [
    {
        id: "1", name: "Library Cafe KKU", match: 98, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", rating: 4.8, reviews: 124, zone: "กังสดาล", reason: "บรรยากาศเงียบสงบ ปลั๊กไฟทุกโต๊ะ เปิดถึงเที่ยงคืน WiFi เร็วมาก เหมาะสำหรับนั่งทำงานยาวๆ", tags: ["WiFi", "ปลั๊กไฟ", "เปิดดึก"]
    },
    {
        id: "2", name: "Study Space Cafe", match: 92, image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80", rating: 4.6, reviews: 89, zone: "หลังมอ", reason: "โซน Co-working กว้างขวาง แอร์เย็นสบาย มีห้องประชุมกลุ่มให้ใช้ฟรี กาแฟอร่อย", tags: ["Co-working", "แอร์", "ห้องประชุม"]
    }
];

interface Message {
    role: "user" | "ai";
    content: string;
    results?: typeof mockResults;
}

export const AIPage: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text?: string) => {
        const message = text || query;
        if (!message.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: message }]);
        setQuery("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: `จากที่คุณบอกว่า "${message}" ผมหาร้านที่ตรงกับความต้องการของคุณมากที่สุดให้แล้วครับ`, results: mockResults }
            ]);
        }, 1500);
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#ffffff' }}>
            
            <style>{`
                .typing-dot { width: 6px; height: 6px; background-color: #adb5bd; border-radius: 50%; display: inline-block; animation: typing 1.4s infinite ease-in-out both; }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
                .chat-user { background-color: #111827; color: white; border-radius: 1.25rem 1.25rem 0.25rem 1.25rem; }
                .chat-ai { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 1.25rem 1.25rem 1.25rem 0.25rem; }
                .chat-container::-webkit-scrollbar { display: none; }
                .chat-container { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Header */}
            <div className="d-none d-lg-block sticky-top" style={{ zIndex: 1030 }}><TopNavbar activePage="ai" showSearchBar={true} /></div>
            <header className="d-lg-none bg-white border-bottom sticky-top" style={{ zIndex: 1030, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
                <div className="d-flex align-items-center justify-content-between px-3" style={{ height: '56px' }}>
                    <button onClick={() => window.history.back()} className="btn btn-link text-muted p-0"><ChevronLeft size={24} /></button>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-dark rounded-3 d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}><Sparkles size={14} className="text-white" /></div>
                        <span className="fw-bold text-dark">AI Helper</span>
                    </div>
                    <div style={{ width: '24px' }}></div>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-grow-1 overflow-auto chat-container" style={{ paddingBottom: '20px' }}>
                <div className="container py-4 py-lg-5" style={{ maxWidth: '800px' }}>
                    
                    {!hasMessages ? (
                        <AIEmptyState onSend={handleSend} isLoggedIn={isLoggedIn} />
                    ) : (
                        <div className="d-flex flex-column gap-4 px-3 px-lg-0">
                            {messages.map((msg, i) => (
                                <div key={i} className={`d-flex flex-column ${msg.role === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                                    <div className="d-flex gap-2" style={{ maxWidth: '85%' }}>
                                        {msg.role === 'ai' && (
                                            <div className="bg-dark rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: '30px', height: '30px' }}><Sparkles size={14} className="text-white" /></div>
                                        )}
                                        <div className={`p-3 shadow-sm ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`}>
                                            <p className="m-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{msg.content}</p>
                                        </div>
                                    </div>

                                    {msg.results && (
                                        <div className="mt-3 ps-0 ps-md-5 w-100">
                                            {msg.results.map((shop) => (
                                                <AIResultCard key={shop.id} shop={shop} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="d-flex align-items-start gap-2 max-w-75">
                                    <div className="bg-dark rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 mt-1" style={{ width: '30px', height: '30px' }}><Sparkles size={14} className="text-white" /></div>
                                    <div className="chat-ai p-3 shadow-sm d-flex align-items-center gap-1" style={{ height: '46px' }}>
                                        <div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Input Component */}
            <AIChatInput query={query} setQuery={setQuery} handleSend={handleSend} inputRef={inputRef} />

            <div className="d-lg-none"><BottomNav activePage="ai" /></div>
        </div>
    );
};