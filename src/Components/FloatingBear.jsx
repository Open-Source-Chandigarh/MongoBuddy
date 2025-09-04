import { useState } from 'react';
import BearMascot from './BearMascot';

const FloatingBear = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const helpMessages = [
    "Need help? I'm here to guide you! 🐻",
    "Click on any module to start learning! 📚",
    "Complete quests to earn XP and badges! 🏆",
    "Stuck? Check out the community forum! 💬",
    "Don't forget to take breaks! 😊"
  ];

  const handleClick = () => {
    setIsClicked(!isClicked);
    setShowMessage(!showMessage);
    
    // Auto-hide message after 3 seconds
    if (!showMessage) {
      setTimeout(() => {
        setShowMessage(false);
        setIsClicked(false);
      }, 3000);
    }
  };

  const randomMessage = helpMessages[Math.floor(Math.random() * helpMessages.length)];

  return (
    <>
      {/* Floating Bear Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Help Message Bubble */}
          {showMessage && (
            <div className="absolute bottom-full right-0 mb-4 bg-white rounded-lg shadow-lg p-4 max-w-xs border-2 border-green-200 animate-bounce">
              <div className="text-sm text-gray-700 font-medium">
                {randomMessage}
              </div>
              {/* Speech bubble arrow */}
              <div className="absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-200"></div>
            </div>
          )}

          {/* Bear Button */}
          <button
            onClick={handleClick}
            className={`
              bg-gradient-to-br from-green-100 to-green-200 
              rounded-full p-3 shadow-lg 
              hover:shadow-xl hover:scale-105 
              transition-all duration-300 
              border-2 border-green-300
              ${isClicked ? 'scale-110 bg-gradient-to-br from-green-200 to-green-300' : ''}
            `}
            title="Need help? Click me!"
          >
            <BearMascot 
              size={60} 
              loop={isClicked} 
              autoplay={true}
            />
          </button>

          {/* Pulsing ring animation when not clicked */}
          {!isClicked && (
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingBear;
