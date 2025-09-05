import React, { useState, useEffect } from 'react';
import Features from "./Components/Index page/Features"
import Footer from "./Components/Index page/Footer"
import Navbar from "./Components/Index page/Navbar"
import Home from "./Components/Index page/Home"
import LearningPath from "./Components/LearningPath"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import BearMascot from "./Components/BearMascot"
import Module1 from "./Components/Module/Module1"
import Module2 from "./Components/Module/Module2"
import Module3 from "./Components/Module/Module3"
import Module4 from "./Components/Module/Module4"
import Module5 from "./Components/Module/Module5"
import Module6 from "./Components/Module/Module6"
import Module7 from "./Components/Module/Module7"
import Module8 from "./Components/Module/Module8"
import Installation from "./Components/Module/Installation"
import Task1 from "./Components/Task/Task1"
import Taskk2 from "./Components/Task/Taskk2"
import FloatingBear from './Components/FloatingBear';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'learning', 'login', 'signup', 'module1', 'module2', 'module3', 'module4', 'module5', 'module6', 'module7', 'module8', 'installation', 'task1', 'task2'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);

  // No authentication check needed - starting with no authentication
  useEffect(() => {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  }, []);

  const handleStartLearning = () => {
    setCurrentPage('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToModules = () => {
    if (isAuthenticated) {
      setCurrentPage('learning');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignupSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToLogin = () => {
    setCurrentPage('login');
  };

  const handleSwitchToSignup = () => {
    setCurrentPage('signup');
  };

  const handleLogout = () => {
    // TODO: Replace with your authentication logout API call
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
  };

  const handleGetStarted = () => {
    setCurrentPage('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule1 = () => {
    setCurrentPage('module1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule2 = () => {
    setCurrentPage('module2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule3 = () => {
    setCurrentPage('module3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule4 = () => {
    setCurrentPage('module4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule5 = () => {
    setCurrentPage('module5');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule6 = () => {
    setCurrentPage('module6');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule7 = () => {
    setCurrentPage('module7');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartModule8 = () => {
    setCurrentPage('module8');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTask1 = () => {
    setCurrentPage('task1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTask2 = () => {
    setCurrentPage('task2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInstallation = () => {
    setCurrentPage('installation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModuleComplete = (moduleId, score) => {
    setCompletedModules(prev => [...prev, { id: moduleId, score }]);
    
    // Mark the corresponding checkpoint as completed
    if (window.learningPathHelpers && window.learningPathHelpers.markCheckpointAsCompleted) {
      window.learningPathHelpers.markCheckpointAsCompleted(moduleId);
    }
  };

  const handleBackToPath = () => {
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BearMascot size="100px" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Hide on auth pages and modules */}
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && (
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          onGetStarted={handleGetStarted}
          onGoHome={handleBackToHome}
          onGoToModules={handleGoToModules}
        />
      )}

      {/* Page Rendering */}
      {currentPage === 'home' && (
        <Home onStartLearning={handleStartLearning} />
      )}

      {currentPage === 'signup' && (
        <Signup 
          onSwitchToLogin={handleSwitchToLogin}
          onSignupSuccess={handleSignupSuccess}
          onBackToHome={handleBackToHome}
        />
      )}

      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={handleBackToHome}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {currentPage === 'learning' && (
        <div>
          {/* Back to Home Button */}
          <div className="p-4">
            <button 
              onClick={handleBackToHome}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
          
          {/* Learning Path - Interactive Quiz Checkpoints */}
          <LearningPath 
            onStartModule1={handleStartModule1}
            onStartModule2={handleStartModule2}
            onStartModule3={handleStartModule3}
            onStartModule4={handleStartModule4}
            onStartModule5={handleStartModule5}
            onStartModule6={handleStartModule6}
            onStartModule7={handleStartModule7}
            onStartModule8={handleStartModule8}
            onStartTask1={handleStartTask1}
            onStartTask2={handleStartTask2}
            onStartInstallation={handleStartInstallation}
            completedModules={completedModules}
          />
        </div>
      )}

      {currentPage === 'module1' && (
        <Module1 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module2' && (
        <Module2 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module3' && (
        <Module3 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module4' && (
        <Module4 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module5' && (
        <Module5 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module6' && (
        <Module6 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module7' && (
        <Module7 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'module8' && (
        <Module8 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'task1' && (
        <Task1 
          onBackToPath={handleBackToPath}
          onTaskComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'task2' && (
        <Taskk2 
          onBackToPath={handleBackToPath}
          onTaskComplete={handleModuleComplete}
        />
      )}

      {currentPage === 'installation' && (
        <Installation 
          onBackToPath={handleBackToPath}
          onModuleComplete={handleModuleComplete}
        />
      )}

      {/* Footer - Hide on auth pages and modules */}
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && <Footer />}

      {/* Floating Bear Mascot - Hide on auth pages and modules */}
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && (
        <div className="fixed bottom-4 right-4 z-50">
          {/* <BearMascot size="80px" /> */}
          {/* <FloatingBear></FloatingBear> */}
        </div>

      )}
    </div>
  )
}

export default App
