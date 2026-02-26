import React from "react";
import { Send } from "lucide-react";
import '../../assets/css/AIStyles.css'

interface AIChatInputProps {
    query: string;
    setQuery: (val: string) => void;
    handleSend: () => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
}

export const AIChatInput: React.FC<AIChatInputProps> = ({ query, setQuery, handleSend, inputRef }) => {
    return (
        <div className="sticky-bottom" style={{ zIndex: 1030, background: 'rgba(26, 20, 18, 0.9)', backdropFilter: 'blur(8px)', borderTop: '1px solid #3d302a' }}>            <div className="container py-3" style={{ maxWidth: '800px' }}>
            <div className="position-relative px-2 px-lg-0">

                
                <textarea
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="บอกความต้องการของคุณ..."
                    rows={1}
                    className="form-control rounded-4 custom-ai-input border px-4 py-3 shadow-none pe-5"
                    style={{ resize: "none", fontSize: "0.95rem" }}
                />
                <button
                    onClick={() => handleSend()}
                    disabled={!query.trim()}
                    className="btn position-absolute bottom-0 end-0 m-3 rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                        width: '32px',
                        height: '32px',
                        right: '10px',
                        backgroundColor: query.trim() ? '#A73B24' : '#2d2320',
                        color: query.trim() ? '#fff5f0' : '#8a7b72',
                        border: 'none'
                    }}
                >
                    <Send size={14} style={{ marginLeft: '-2px' }} />
                </button>
            </div>
        </div>
            <div className="d-lg-none" style={{ height: '70px' }}></div>
        </div>
    );
};