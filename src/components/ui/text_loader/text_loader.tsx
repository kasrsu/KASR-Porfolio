import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TextLoaderProps {
    text: string;
    typingSpeed?: number;
    cursorBlinkSpeed?: number;
    className?: string;
    onComplete?: () => void;
}

const TextLoader: React.FC<TextLoaderProps> = ({
    text,
    typingSpeed = 50,
    cursorBlinkSpeed = 0.5,
    className = '',
    onComplete,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.substring(0, displayedText.length + 1));
            }, typingSpeed);
            
            return () => clearTimeout(timeout);
        } else if (!isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [displayedText, text, typingSpeed, isComplete, onComplete]);

    return (
        <div className={`terminal-text ${className}`}>
            <span>{displayedText}</span>
            {!isComplete && (
                <motion.span
                    className="cursor"
                    animate={{ 
                        opacity: [0, 1, 0] 
                    }}
                    transition={{
                        duration: cursorBlinkSpeed,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    _
                </motion.span>
            )}
        </div>
    );
};

export default TextLoader;