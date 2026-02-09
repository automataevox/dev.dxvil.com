import { useState, useEffect } from 'react';

interface UseTypingAnimationProps {
    text: string;
    speed?: number;
}

export const useTypingAnimation = ({ text, speed = 100 }: UseTypingAnimationProps) => {
    const [typedText, setTypedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setTypedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return { typedText, isComplete };
};
