import { useEffect, useState } from 'react';

export default function Typewriter({ words, typingSpeed = 150, pauseTime = 2000 }){
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayText.length < words[currentWordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + words[currentWordIndex][prev.length]);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setTyping(false), pauseTime);
      }
    } else {
      timeout = setTimeout(() => {
        setTyping(true);
        setDisplayText('');
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentWordIndex, words, typingSpeed, pauseTime]);

  return (
    <span className="text-white font-playfair border-r-2 border-white pr-1 animate-pulse">
      {displayText}
    </span>
  );
};