import { useState, useEffect } from 'react';

export const useTypingEffect = (phrases: string[]) => {
    const [text, setText] = useState("");

    useEffect(() => {
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeoutId: NodeJS.Timeout;

        const type = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                setText(currentPhrase.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setText(currentPhrase.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            let typingSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                typingSpeed = 2000; // รอ 2 วิ ตอนพิมพ์จบ
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500; // รอแป๊บก่อนเริ่มคำใหม่
            }

            timeoutId = setTimeout(type, typingSpeed);
        };

        timeoutId = setTimeout(type, 1000);
        return () => clearTimeout(timeoutId);
    }, [phrases]);

    return text;
};