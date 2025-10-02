import BearMascot from '../BearMascot';

function Navbar({ user, onLogout, onGetStarted, onGoHome, onGoToModules }){  
    return(
  <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button 
                  onClick={onGoHome}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg p-1"
                  aria-label="Go to home page"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <BearMascot size="20px" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Mongo Buddy</span>
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={onGoHome}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={onGoToModules}
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
              >
                Modules
              </button>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Welcome, <span className="font-medium">{user.name}</span>!
                  </span>
                  <button 
                    onClick={onLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onGetStarted}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
}
export default Navbar