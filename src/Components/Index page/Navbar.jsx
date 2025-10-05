import React, { useState } from "react";
import BearMascot from "../BearMascot";

function Navbar({ user, onLogout, onGetStarted, onGoHome, onGoToModules }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const LinkBtn = ({ onClick, children }) => (
    <button
      onClick={() => {
        onClick?.();
        closeMobile();
      }}
      className="w-full text-left md:w-auto px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50"
    >
      {children}
    </button>
  );

  return (
    <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm border-b border-emerald-900/5">
      {/* ambient halo */}
      <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,237,100,0.12),transparent_45%,rgba(0,104,74,0.10),transparent_80%)] opacity-70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between h-16">
          {/* Brand + mobile toggle */}
          <div className="flex items-center">
            <button
              onClick={() => {
                onGoHome?.();
                closeMobile();
              }}
              role="link"
              aria-label="Go to homepage"
              className="flex items-center space-x-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50 rounded-lg px-1"
            >
              <div className="w-8 h-8 bg-[#001E2B] rounded-lg grid place-items-center ring-1 ring-emerald-400/30">
                <BearMascot size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Mongo Buddy
              </span>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => {
                onGoHome?.(); /* close mobile */
              }}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50"
            >
              Home
            </button>
            <LinkBtn onClick={onGoToModules}>Modules</LinkBtn>

            {user ? (
              <div className="flex items-center space-x-3 pl-2 ml-2 border-l border-emerald-900/10">
                <span className="text-gray-700 text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>!
                </span>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300/60 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onGetStarted?.();
                  closeMobile();
                }}
                className="ml-2 inline-flex items-center rounded-lg bg-[#00ED64] text-[#001E2B] px-4 py-2 text-sm font-semibold hover:bg-emerald-400 transition-colors shadow-[0_10px_24px_-12px_rgba(0,237,100,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobile}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen ? "true" : "false"}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50"
            >
              {/* Icon: hamburger / close */}
              <svg
                className={`${mobileOpen ? "hidden" : "block"} h-6 w-6`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                className={`${mobileOpen ? "block" : "hidden"} h-6 w-6`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`${mobileOpen ? "block" : "hidden"} md:hidden pb-4`}
        >
          <div className="mt-2 space-y-1">
            <LinkBtn onClick={onGoHome}>Home</LinkBtn>
            <LinkBtn onClick={onGoToModules}>Modules</LinkBtn>

            {user ? (
              <div className="pt-2 border-t border-emerald-900/10">
                <div className="px-3 py-2 text-gray-700 text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>!
                </div>
                <button
                  onClick={() => {
                    onLogout?.();
                    closeMobile();
                  }}
                  className="w-full mt-1 inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300/60 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onGetStarted?.();
                  closeMobile();
                }}
                className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-[#00ED64] text-[#001E2B] px-4 py-2 text-sm font-semibold hover:bg-emerald-400 transition-colors shadow-[0_10px_24px_-12px_rgba(0,237,100,0.55)] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
