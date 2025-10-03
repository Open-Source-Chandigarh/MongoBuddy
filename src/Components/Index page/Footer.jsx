import BearMascot from '../BearMascot';

function Footer(){
  return (
    <footer className="bg-[#0f1714] text-white mt-auto">
      <div className="relative">
        {/* faint top feather */}
        <div className="pointer-events-none absolute -top-6 inset-x-0 h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#001E2B] rounded-lg grid place-items-center ring-1 ring-emerald-400/30">
                <BearMascot size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Mongo Buddy</span>
            </div>
            <p className="text-emerald-100/80">
              Master MongoDB through interactive gaming and hands‑on learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-emerald-100/80">
              <li><a href="#" className="hover:text-white transition-colors">Learning Modules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">My Profile</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Community</h4>
            <ul className="space-y-2 text-emerald-100/80">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4 text-emerald-100/80">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-900/40 mt-10 pt-8 text-center text-emerald-200/80">
          <p>&copy; 2025 MongoDB Quest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
