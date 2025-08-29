import React, { useEffect, useState } from "react";

// Easing function for a smooth, decelerating effect
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
console.log("hello")
const AnimatedNumber = ({ value, duration = 2000, format = (v) => v }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    // Safely parse the integer value from the string
    const end = typeof value === "number" ? value : parseInt(value.toString().replace(/[^0-9]/g, ""));
    
    if (isNaN(end) || start === end) {
        setDisplay(end);
        return;
    };

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      // Calculate progress with the easing function
      const progress = easeOutCubic(Math.min((timestamp - startTime) / duration, 1));
      
      const currentDisplay = Math.floor(progress * (end - start) + start);
      setDisplay(currentDisplay);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure the final value is always set correctly
        setDisplay(end);
      }
    };

    requestAnimationFrame(step);
    
  }, [value, duration]);

  return <span>{format(display)}</span>;
};

export default AnimatedNumber;
