import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style>
                {`
                    .scroll-to-top-btn {
                        bottom: 120px; /* มือถือ: ดันขึ้นสูงหน่อย เพื่อหลบแถบ Bottom Nav */
                        right: 30px;   /* มือถือ: ชิดขอบเข้ามาหน่อย (20px กำลังสวย ไม่บังเนื้อหา) */
                    }
                    
                    @media (min-width: 992px) {
                        .scroll-to-top-btn {
                            bottom: 40px; /* จอคอม: ดันลงมาต่ำได้ เพราะไม่มีแถบ Bottom Nav แล้ว */
                            right: 40px;  /* จอคอม: ขยับห่างขอบได้มากขึ้น (40px) ดูสมดุลกว่า */
                        }
                    }
                `}
            </style>

            <button
                onClick={scrollToTop}
                className={`scroll-to-top-btn btn rounded-circle shadow-lg position-fixed d-flex justify-content-center align-items-center transition-all hover-scale ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#e8b94a', // สีทอง
                    color: '#1a1412', // ลูกศรสีเข้ม
                    border: 'none',
                    zIndex: 1040,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
            >
                <ArrowUp size={24} />
            </button>
        </>
    );
};