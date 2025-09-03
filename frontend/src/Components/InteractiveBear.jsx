import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import interactiveBearAnimation from '../assets/interactive-bear.json';

const welcomeMessages = [
  "🎯 Ready to master MongoDB? Let's start your quest!",
  "🚀 Each level teaches you something new about databases!",
  "💡 Click on me for tips and encouragement!",
  "🏆 You're doing great! Keep learning!",
  "🌟 MongoDB skills unlocked! What's next?",
  "🎮 Ready for the next challenge?",
  "💾 Data is everywhere - let's organize it!",
  "🔥 Your MongoDB journey is just beginning!"
];

const encouragementMessages = [
  "💪 You've got this! MongoDB is easier than you think!",
  "⭐ Great progress! Every expert was once a beginner!",
  "🎯 Focus and practice - you're learning fast!",
  "🚀 Keep going! You're building valuable skills!",
  "🏅 Amazing work! You're becoming a database expert!",
  "💎 Your dedication is paying off!",
  "🔥 On fire! Keep up the excellent work!",
  "🌟 Brilliant! You're mastering MongoDB!"
];

const InteractiveBear = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const lottieRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      showRandomMessage(welcomeMessages);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        moveToRandomPosition();
        setTimeout(() => {
          showRandomMessage(encouragementMessages);
        }, 500);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const showRandomMessage = (messageArray) => {
    const randomMessage = messageArray[Math.floor(Math.random() * messageArray.length)];
    setMessage(randomMessage);
    setIsAnimating(true);
    
    setTimeout(() => {
      setMessage('');
      setIsAnimating(false);
    }, 4000);
  };

  const moveToRandomPosition = () => {
    const newX = Math.random() * (window.innerWidth - 200);
    const newY = Math.random() * (window.innerHeight - 200) + 100;
    setPosition({ x: newX, y: newY });
  };

  const handleBearClick = () => {
    // Play animation
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0, true);
    }
    
    // Show encouragement message
    showRandomMessage(encouragementMessages);
    
    // Move to new position after a short delay
    setTimeout(() => {
      moveToRandomPosition();
    }, 1000);
  };

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.5);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Interactive Bear */}
      <div
        className={`fixed z-50 cursor-pointer transition-all duration-1000 ease-in-out
          ${isAnimating ? 'scale-110 animate-bounce' : 'hover:scale-105'}
        `}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'left 1s ease-in-out, top 1s ease-in-out'
        }}
        onClick={handleBearClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <Lottie
            lottieRef={lottieRef}
            animationData={interactiveBearAnimation}
            style={{ width: 120, height: 120 }}
            loop={true}
            autoplay={true}
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
          
          {/* Click indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Message Bubble */}
      {message && (
        <div
          className={`fixed z-50 max-w-xs transition-all duration-500 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            left: `${position.x + 140}px`,
            top: `${position.y + 20}px`,
          }}
        >
          <div className="bg-white border-2 border-green-500 rounded-xl p-4 shadow-xl relative transform">
            {/* Speech bubble arrow */}
            <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white transform -translate-x-2"></div>
            <div className="absolute left-0 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-green-500 transform -translate-x-1"></div>
            
            <p className="text-gray-800 text-sm font-medium leading-relaxed">
              {message}
            </p>
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMessage('');
                setIsAnimating(false);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-30"
            style={{
              left: `${position.x + 60 + Math.sin(Date.now() / 1000 + i) * 30}px`,
              top: `${position.y + 60 + Math.cos(Date.now() / 1000 + i) * 20}px`,
              animation: `float 3s ease-in-out infinite ${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </>
  );
};

export default InteractiveBear;
