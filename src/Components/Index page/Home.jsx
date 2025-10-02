import React from "react";

import Features from "./Features";
import BearMascot from "../BearMascot";
import EnhancedHero from "./EnhancedHero";

const Home = ({ onStartLearning }) => {
  return (
    <div>
      {/* Hero Section */}
      <EnhancedHero onStartLearning={onStartLearning} />

      <div className="relative py-20 bg-white overflow-hidden">
        {/* Soft diagonal highlight + grain */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-56 bg-gradient-to-b from-emerald-50 to-transparent opacity-90" />
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23000000%22 opacity=%220.25%22/></svg>')]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill subtitle */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 ring-1 ring-emerald-200/70 bg-emerald-50 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
            <span className="text-sm font-semibold text-emerald-700">
              Mongo Buddy
            </span>
            <span className="text-emerald-500">•</span>
            <span className="text-sm text-emerald-700/80">
              Interactive Learning
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Mongo Buddy — Interactive Learning
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Your friendly MongoDB learning companion!
          </p>

          {/* Mascot on a crafted pedestal */}
          <div className="mt-10 mx-auto w-fit group">
            <div className="relative">
              {/* Ambient conic glow */}
              <div className="absolute -inset-10 rounded-[32px] bg-[conic-gradient(from_130deg_at_50%_50%,rgba(0,237,100,0.20),transparent_30%,rgba(0,104,74,0.14),transparent_60%)] blur-2xl opacity-90" />

              {/* Pedestal shell */}
              <div className="relative rounded-[28px] p-5 sm:p-6 bg-white ring-1 ring-emerald-900/5 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.2)]">
                {/* Inner porcelain base */}
                <div className="rounded-2xl bg-gradient-to-b from-white to-emerald-50 ring-1 ring-emerald-100 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                  {/* Inner subtle ring */}
                  <div className="rounded-2xl ring-1 ring-emerald-200/50 backdrop-blur-[0.5px] bg-white/60">
                    <BearMascot size={220} className="mx-auto" />
                  </div>
                </div>

                {/* Micro label row */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-100 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-emerald-300/60">
                    <span className="text-base">🐻</span>
                    Official Mascot
                  </span>
                  <span className="inline-flex items-center gap-2 text-emerald-800/90 bg-emerald-50 rounded-full px-3 py-1 text-xs ring-1 ring-emerald-200/60">
                    📚 Built for learners
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Divider */}
          <div className="mt-12 flex items-center justify-center gap-4 sm:gap-6">
            <a href="#curriculum" className="btn-soft-emerald">
              Explore Curriculum
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              See how it works →
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <Features />

      {/* CTA */}
      <div className="relative overflow-hidden">
        {/* Ambient conic glow */}
        <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,237,100,0.18),transparent_45%,rgba(0,104,74,0.16),transparent_80%)] opacity-80" />
        {/* Faint grain */}
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23000000%22 opacity=%220.25%22/></svg>')]" />

        <div className="relative bg-gradient-to-br from-[#001E2B] via-[#012a36] to-[#023430] py-16">
          {/* Feathered top edge */}
          <div className="pointer-events-none absolute -top-8 inset-x-0 h-10 bg-gradient-to-b from-white/50 to-transparent" />

          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Begin Your MongoDB Adventure?
            </h2>
            <p className="text-xl text-emerald-100/90 mb-8">
              Join thousands of developers who have mastered MongoDB through our
              interactive platform
            </p>

            <button
              onClick={onStartLearning}
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold
                   text-[#001E2B] bg-white transition-all duration-300
                   hover:bg-emerald-50 active:scale-[0.99]
                   shadow-[0_14px_40px_-16px_rgba(255,255,255,0.55),0_10px_30px_-18px_rgba(0,237,100,0.55)]
                   focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/60"
            >
              <span className="relative z-10">🚀 Start Learning Now</span>

              {/* Shine sweep */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute -inset-y-8 -left-2 w-8 rotate-12 bg-gradient-to-b from-white/80 to-white/10 opacity-0 group-hover:opacity-100 animate-shine" />
              </span>

              {/* Subtle border aura on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, rgba(0,237,100,0.0), rgba(0,237,100,0.35), rgba(0,237,100,0.0))",
                }}
              />
            </button>

            {/* Secondary helpers */}
            <div className="mt-5 text-emerald-200/80 text-sm">
              No sign‑up required to preview the curriculum.
            </div>
          </div>
        </div>

        {/* Keyframes (scoped via next/style jsx or global CSS) */}
        <style jsx>{`
          @keyframes shine {
            from {
              transform: translateX(-120%) translateY(0) rotate(12deg);
            }
            to {
              transform: translateX(220%) translateY(0) rotate(12deg);
            }
          }
          .animate-shine {
            animation: shine 1.2s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-shine {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
