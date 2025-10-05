import React, { useState, useEffect, useMemo } from 'react';
import BearMascot from '../BearMascot';

const EnhancedHero = ({ onStartLearning }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const phrases = useMemo(() => ([
    'Master MongoDB from Zero to Hero',
    'Learn Through Interactive Challenges',
  ]), []);

  const charCounts = useMemo(() => phrases.map(p => p.length), [phrases]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const stepsForCurrent = charCounts[currentPhrase] || 24;
  const typeDur = Math.min(3.2, 0.08 * stepsForCurrent + 1.4);

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-[#001E2B] via-[#011b24] to-[#023430]">
      {/* Soft brand blobs (responsive sizes and blend) */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-12 left-4 sm:top-16 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[rgba(0,237,100,0.18)] rounded-full mix-blend-screen blur-xl md:blur-2xl animate-blob" />
        <div className="absolute top-12 right-4 sm:top-16 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[rgba(0,104,74,0.18)] rounded-full mix-blend-screen blur-xl md:blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-6 left-10 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-[rgba(2,52,48,0.20)] rounded-full mix-blend-screen blur-xl md:blur-2xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 min-h-[70vh]">
          {/* Left Content */}
          <div className={`lg:w-1/2 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'}`}>
            <div className="mb-5 sm:mb-6">
              <span className="inline-block bg-[rgba(0,237,100,0.12)] text-[#00ED64] px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold ring-1 ring-[rgba(0,237,100,0.25)]">
                🎮 Interactive Learning Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] sm:leading-[1.08] lg:leading-tight mb-4 sm:mb-6 tracking-tight">
              <span className="text-[#00ED64] drop-shadow-[0_0_20px_rgba(0,237,100,0.15)]">Learn With</span>
              <br />
              <span className="bg-gradient-to-r from-[#00ED64] to-emerald-400 bg-clip-text text-transparent">
                Mongo Buddy
              </span>
            </h1>

            {/* Typewriter sub-heading (nowrap responsive) */}
            <div className="h-12 sm:h-14 mb-6 sm:mb-8">
              <h2
                className="text-lg sm:text-2xl lg:text-3xl font-medium text-emerald-100/90 relative w-[max-content] font-mono"
                style={{ animation: 'none' }}
              >
                <span
                  className="relative block whitespace-nowrap"
                  style={{ animation: `typewriter ${typeDur}s steps(${stepsForCurrent}) forwards` }}
                >
                  {phrases[currentPhrase]}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-[-0.12em] top-0 h-full w-[0.12em] bg-emerald-300"
                  style={{ animation: `caret-move ${typeDur}s steps(${stepsForCurrent}) forwards, caret-blink 1s steps(1) infinite ${typeDur}s` }}
                />
              </h2>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-emerald-100/80 mb-8 sm:mb-10 leading-relaxed max-w-xl">
              Embark on a journey to master MongoDB through gamified lessons, interactive challenges, and hands‑on projects with a friendly bear guide.
            </p>

            {/* CTA Buttons (responsive sizing) */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <button
                onClick={onStartLearning}
                className="group relative inline-flex items-center justify-center px-6 sm:px-7 lg:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
                           text-[#001E2B] bg-[#00ED64] transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.99]
                           focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60
                           shadow-[0_12px_30px_-10px_rgba(0,237,100,0.55)] w-full sm:w-auto"
              >
                <span className="relative z-10">🚀 Start Learning</span>
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute -inset-y-8 -left-1 w-8 rotate-12 bg-gradient-to-b from-white/70 to-white/10 opacity-0 group-hover:opacity-100 animate-shine" />
                </span>
                <span
                  className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'conic-gradient(from 180deg at 50% 50%, rgba(0,237,100,0.0), rgba(0,237,100,0.35), rgba(0,237,100,0.0))' }}
                />
              </button>

              <button
                className="relative inline-flex items-center justify-center px-6 sm:px-7 lg:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
                           text-emerald-100 border-2 border-emerald-300/40 transition-all duration-300
                           hover:bg-emerald-900/30 hover:border-emerald-300 hover:scale-[1.02] active:scale-[0.99]
                           focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40 w-full sm:w-auto"
              >
                <span className="relative z-10">📖 View Curriculum</span>
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0))' }}
                />
              </button>
            </div>

            {/* Stats (wrap on small) */}
            <div className="grid grid-cols-3 sm:max-w-md gap-3 sm:gap-6 text-center text-emerald-100/85">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#00ED64]">50+</div>
                <div className="text-sm sm:text-base">Interactive Lessons</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#00ED64]">1000+</div>
                <div className="text-sm sm:text-base">Happy Learners</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#00ED64]">100%</div>
                <div className="text-sm sm:text-base">Hands‑on Practice</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`lg:w-1/2 relative transition-all duration-700 delay-150 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}>
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[28px] bg-[conic-gradient(from_120deg_at_50%_50%,rgba(0,237,100,0.12),transparent_35%)] blur-lg sm:blur-xl opacity-70" />
                <div className="relative rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 lg:p-8 shadow-2xl ring-1 ring-emerald-500/20 bg-white/10 backdrop-blur-md">
                  <BearMascot size={240} className="sm:hidden" />
                  <BearMascot size={280} className="hidden sm:block lg:hidden" />
                  <BearMascot size={300} className="hidden lg:block" />
                </div>
              </div>

              {/* Floating elements (smaller on mobile) */}
              <div className="absolute top-6 left-6 sm:top-10 sm:left-10 bg-white/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-2.5 sm:p-3 shadow-md animate-float">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <div className="absolute top-16 right-3 sm:top-20 sm:right-5 bg-white/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-2.5 sm:p-3 shadow-md animate-float animation-delay-1000">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <div className="absolute bottom-8 left-3 sm:bottom-10 sm:left-5 bg-white/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-2.5 sm:p-3 shadow-md animate-float animation-delay-2000">
                <span className="text-xl sm:text-2xl">🏆</span>
              </div>
              <div className="absolute bottom-16 right-6 sm:bottom-20 sm:right-10 bg-white/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-2.5 sm:p-3 shadow-md animate-float animation-delay-3000">
                <span className="text-xl sm:text-2xl">💎</span>
              </div>

              {/* Pulsing rings (reduced on mobile) */}
              <div className="absolute inset-0 rounded-full border border-emerald-400/25 animate-ping opacity-15 hidden sm:block"></div>
              <div className="absolute inset-4 rounded-full border border-emerald-500/25 animate-ping opacity-25 animation-delay-1000 hidden sm:block"></div>
            </div>

            {/* Speech Bubble */}
            <div className="absolute top-2 sm:top-5 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-md rounded-xl px-3 py-2 sm:p-4 shadow-lg border border-emerald-500/30 animate-bounce-slow">
              <p className="text-emerald-50 font-medium text-xs sm:text-sm">
                Hi! I'm your MongoDB guide! 🐻
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(24px,-36px) scale(1.06); } 66% { transform: translate(-18px,16px) scale(0.96); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-10px) rotate(3deg); } }
        @keyframes bounce-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-float { animation: float 3.2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2.4s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Typewriter */
        @keyframes typewriter { to { clip-path: inset(0 0 0 0); } }
        @keyframes caret-move { to { transform: translateX(100%); } }
        @keyframes caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        h2 > span:first-child { display: inline-block; white-space: nowrap; clip-path: inset(0 100% 0 0); }

        /* Button shine */
        @keyframes shine { from { transform: translateX(-120%) translateY(0) rotate(12deg); } to { transform: translateX(220%) translateY(0) rotate(12deg); } }
        .animate-shine { animation: shine 1.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-float, .animate-bounce-slow, .animate-shine { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default EnhancedHero;
