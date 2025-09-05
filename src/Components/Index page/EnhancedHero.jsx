import React, { useState, useEffect } from 'react';
import BearMascot from '../BearMascot';

const EnhancedHero = ({ onStartLearning }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const phrases = [
    "Master MongoDB from Zero to Hero",
    "Learn Through Interactive Challenges",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
                🎮 Interactive Learning Platform
              </span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-green-600">Learn With</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
               Mongo Buddy
              </span>
            </h1>

            {/* Dynamic Phrase Animation */}
            <div className="h-20 mb-8 overflow-hidden">
              <h2 className="text-2xl lg:text-3xl text-gray-700 font-medium">
                <div>
                  {phrases[currentPhrase]}
                </div>
              </h2>
            </div>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Embark on an epic journey to master MongoDB through gamified lessons, 
              interactive challenges, and hands-on projects. Learn database concepts 
              the fun way with our friendly bear guide!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={onStartLearning}
                className="group relative px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg 
                hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="relative z-10">🚀 Start Learning</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-xl opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl font-semibold text-lg 
                hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-300">
                📖 View Curriculum
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">50+</div>
                <div className="text-gray-600">Interactive Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <div className="text-gray-600">Happy Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600">Hands-on Practice</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Bear Showcase */}
          <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
            <div className="relative flex items-center justify-center">
              
              {/* Main Bear Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white rounded-full p-8 shadow-2xl">
                  <BearMascot size={300} />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-10 left-10 bg-white rounded-lg p-3 shadow-lg animate-float">
                <span className="text-2xl">📊</span>
              </div>
              
              <div className="absolute top-20 right-5 bg-white rounded-lg p-3 shadow-lg animate-float animation-delay-1000">
                <span className="text-2xl">🎯</span>
              </div>
              
              <div className="absolute bottom-10 left-5 bg-white rounded-lg p-3 shadow-lg animate-float animation-delay-2000">
                <span className="text-2xl">🏆</span>
              </div>
              
              <div className="absolute bottom-20 right-10 bg-white rounded-lg p-3 shadow-lg animate-float animation-delay-3000">
                <span className="text-2xl">💎</span>
              </div>

              {/* Interactive Rings */}
              <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-4 border-2 border-green-400 rounded-full animate-ping opacity-30 animation-delay-1000"></div>
            </div>

            {/* Speech Bubble */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-4 shadow-lg border-2 border-green-500 animate-bounce-slow">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-green-500 transform -translate-y-1"></div>
              </div>
              <p className="text-green-800 font-medium text-sm">
                Hi! I'm your MongoDB guide! 🐻
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default EnhancedHero;
