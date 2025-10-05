function Features(){
  const items = [
    { icon: '🎮', title: 'Gamified Learning', desc: 'Earn XP, unlock achievements, and compete with other learners.' },
    { icon: '🛠️', title: 'Hands‑on Practice', desc: 'Practice with real MongoDB instances and practical projects.' },
    { icon: '📊', title: 'Progress Tracking', desc: 'Monitor progress with detailed analytics and milestones.' },
    { icon: '👥', title: 'Community', desc: 'Join a vibrant community of learners and get help.' },
  ];

  return(
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Why Choose Mongo Buddy?
          </h2>
          <p className="text-lg text-gray-600">
            Learn MongoDB the fun way with a gamified, hands‑on approach.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((f, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-px bg-gradient-to-b from-emerald-200/40 to-transparent
                         hover:from-emerald-300/60 hover:to-transparent transition-colors"
            >
              {/* Card body */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all
                              group-hover:shadow-md group-hover:ring-gray-300">
                {/* Icon pedestal with soft glow */}
                <div className="relative mb-4">
                  <div className="absolute -inset-2 rounded-xl bg-emerald-200/40 blur-md opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="relative w-16 h-16 rounded-xl bg-[#001E2B] flex items-center justify-center text-2xl text-[#00ED64] shadow-md">
                    <span>{f.icon}</span>
                  </div>
                </div>

                {/* Title + desc */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>

                {/* Divider + mini hints */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#00ED64]" />
                    <span>Built for real‑world MongoDB skills</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle bottom note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Crafted with MongoDB‑inspired colors for clarity and focus.
        </div>
      </div>
    </div>
  )
}
export default Features;
