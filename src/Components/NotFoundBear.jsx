import BearMascot from './BearMascot';

const NotFoundBear = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="text-center max-w-md">
        <BearMascot size={150} loop={false} />
        <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Lost in the Database Forest
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have wandered off into the MongoDB wilderness. 
          Don't worry, our friendly bear will help you find your way back!
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => window.history.back()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg mr-4"
          >
            ← Go Back
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundBear;
