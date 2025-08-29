import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, duration = 100, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset the animation if the text prop changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, duration);

      // Cleanup the timeout on component unmount or re-render
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, duration]);

  return (
    <h1 className={className}>
      {displayedText}
      {/* Blinking cursor effect */}
      <span className="animate-ping ml-1 inline-block w-1 h-8 bg-green-500"></span>
    </h1>
  );
};

export default TypingAnimation;
