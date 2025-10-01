import React, { useState, useEffect, useCallback } from 'react';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/Auth/AuthForm';
import AuthDebug from './components/AuthDebug';
import DebugPanel from './components/DebugPanel';
import { SupabaseProgressService } from './services/supabaseProgressService';

// Inner App component that has access to auth context
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'learning', 'auth', 'module1', 'module2', 'module3', 'module4', 'module5', 'module6', 'module7', 'module8', 'installation', 'task1', 'task2'
  const [completedModules, setCompletedModules] = useState([]);
  
  const { user, isAuthenticated, loading, signOut } = useAuth();

  // Helper function to convert module names to checkpoint IDs
  const getModuleIdFromName = (moduleName) => {
    const moduleMap = {
      'module1': 0,
      'module2': 1,
      'task1': 2,
      'installation': 3,
      'module3': 4,
      'task2': 5,
      'module4': 6,
      'module5': 7,
      'module6': 8,
      'module7': 9,
      'module8': 10
    };
    return moduleMap[moduleName] !== undefined ? moduleMap[moduleName] : moduleName;
  };

  // Helper function to convert checkpoint IDs to module names
  const getModuleNameFromId = (checkpointId) => {
    const idMap = {
      0: 'module1',
      1: 'module2',
      2: 'task1',
      3: 'installation',
      4: 'module3',
      5: 'task2',
      6: 'module4',
      7: 'module5',
      8: 'module6',
      9: 'module7',
      10: 'module8'
    };
    return idMap[checkpointId] || `module${checkpointId}`;
  };

  // Function to load user's completed modules from Supabase
  const loadUserProgress = useCallback(async () => {
    // console.log("hello");
    if (!user) return;

    try {
      console.log('Loading progress for user:', user.id);
      const result = await SupabaseProgressService.getUserProgress(user.id);
      
      console.log('Progress result:', result);
      
      if (result.success && result.data) {
        // Filter passed modules and convert module_id to checkpoint IDs
        const completedModuleIds = result.data
          .filter(p => {
            console.log('Checking module:', p.module_id, 'passed:', p.passed);
            return p.passed;
          })
          .map(p => {
            // Convert module name to checkpoint ID
            const checkpointId = getModuleIdFromName(p.module_id);
            console.log('Converting:', p.module_id, '->', checkpointId);
            return checkpointId;
          });
        
        setCompletedModules(completedModuleIds);
        console.log('Loaded user progress - completed modules:', completedModuleIds);
      } else {
        console.error('Failed to load progress:', result.error || result.message);
        setCompletedModules([]);
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
      setCompletedModules([]);
    }
  }, [user]);

  // Load user progress when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProgress();
    } else {
      setCompletedModules([]);
    }
  }, [isAuthenticated, user, loadUserProgress]);

  // Auto-redirect to learning path when user signs in while on auth page
  useEffect(() => {
    console.log('Auth state changed:', { 
      isAuthenticated, 
      currentPage, 
      userEmail: user?.email,
      loading 
    });
    
    // Only redirect if we're not loading and user is authenticated and on auth page
    if (!loading && isAuthenticated && currentPage === 'auth') {
      console.log('Redirecting to learning path...');
      // Use a small delay to ensure state has fully updated
      setTimeout(() => {
        setCurrentPage('learning');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isAuthenticated, currentPage, loading, user]);

  const handleStartLearning = () => {
    if (isAuthenticated) {
      setCurrentPage('learning');
    } else {
      setCurrentPage('auth');
    }
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
      setCurrentPage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (userData) => {
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignup = (userData) => {
    setCurrentPage('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    signOut();
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeModule = async (moduleNumber, score = null, totalQuestions = null) => {
    if (!completedModules.includes(moduleNumber)) {
      // Update local state immediately
      const newCompletedModules = [...completedModules, moduleNumber];
      setCompletedModules(newCompletedModules);

      // Save to Supabase if user is authenticated and we have score data
      if (isAuthenticated && user && score !== null && totalQuestions !== null) {
        try {
          const moduleName = getModuleNameFromId(moduleNumber);
          
          // Save module progress
          await SupabaseProgressService.saveModuleProgress({
            userId: user.id,
            email: user.email,
            moduleId: moduleName,
            score: score,
            totalQuestions: totalQuestions,
            timeSpent: 0 // Will be calculated by service if startTime provided
          });
          
          // Save checkpoint completion
          await SupabaseProgressService.saveCheckpointCompletion({
            userId: user.id,
            email: user.email,
            checkpointId: moduleNumber,
            score: score,
            totalQuestions: totalQuestions
          });
          
          console.log(`Progress saved for ${moduleName}: ${score}/${totalQuestions}`);
          console.log(`Checkpoint ${moduleNumber} completed and saved`);
          
        } catch (error) {
          console.error('Error saving progress:', error);
          // Note: We don't revert local state as the user did complete the module
        }
      }
      
      // Auto-redirect to learning path after completion
      setTimeout(() => {
        setCurrentPage('learning');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000); // Small delay to show completion message
    }
  };

  return (
    <div className="App bg-gray-50">
      {/* Navigation */}
      {currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && <Navbar 
        currentPage={currentPage} 
        onBackToHome={handleBackToHome}
        onGoToModules={handleGoToModules}
        onLogin={() => setCurrentPage('auth')}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
      />}

      {/* Page Rendering */}
      {currentPage === 'home' && (
        <Home onStartLearning={handleStartLearning} />
      )}

      {currentPage === 'auth' && (
        <AuthForm onAuthSuccess={() => {
          console.log('onAuthSuccess callback triggered');
          setCurrentPage('learning');
        }} />
      )}

      {currentPage === 'learning' && (
        <div>
          {/* Check authentication before showing learning path */}
          {!isAuthenticated ? (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h2>
                <p className="text-gray-600 mb-6">You need to sign in to access the learning path.</p>
                <button 
                  onClick={() => setCurrentPage('auth')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          ) : (
            <LearningPath 
              onModuleSelect={(module) => setCurrentPage(module)} 
              completedModules={completedModules}
              onBackToHome={handleBackToHome}
              user={user}
              onLogout={handleLogout}
            />
          )}
        </div>
      )}

      {currentPage === 'login' && (
        <Login 
          onLogin={handleLogin}
          onBackToHome={handleBackToHome}
          onSwitchToSignup={() => setCurrentPage('signup')}
        />
      )}

      {currentPage === 'signup' && (
        <Signup 
          onSignup={handleSignup}
          onBackToHome={handleBackToHome}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      )}

      {/* Module Pages */}
      {currentPage === 'module1' && <Module1 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 0, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module2' && <Module2 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 1, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module3' && <Module3 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 4, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module4' && <Module4 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 6, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module5' && <Module5 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 7, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module6' && <Module6 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 8, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module7' && <Module7 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 9, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'module8' && <Module8 onModuleComplete={(moduleNumber, score, totalQuestions) => completeModule(moduleNumber || 10, score, totalQuestions)} onBackToPath={() => setCurrentPage('learning')} />}
      {currentPage === 'installation' && <Installation onComplete={() => completeModule('installation')} onBackToLearning={() => setCurrentPage('learning')} />}
      {currentPage === 'task1' && <Task1 onComplete={() => completeModule('task1')} onBackToLearning={() => setCurrentPage('learning')} />}
      {currentPage === 'task2' && <Taskk2 onComplete={() => completeModule('task2')} onBackToLearning={() => setCurrentPage('learning')} />}

      {/* Footer - Hide on auth pages and modules */}
      {currentPage !== 'auth' && currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && <Footer />}

      {/* Floating Bear Mascot - Hide on auth pages and modules */}
      {currentPage !== 'auth' && currentPage !== 'module1' && currentPage !== 'module2' && currentPage !== 'module3' && currentPage !== 'module4' && currentPage !== 'module5' && currentPage !== 'module6' && currentPage !== 'module7' && currentPage !== 'module8' && currentPage !== 'installation' && currentPage !== 'task1' && currentPage !== 'task2' && (
        <div className="fixed bottom-4 right-4 z-50">
          {/* <BearMascot size="80px" /> */}
          {/* <FloatingBear></FloatingBear> */}
        </div>
      )}
      
      {/* Auth Debug Component */}
      {/* <AuthDebug /> */}
    </div>
  );
}

// Main App wrapper with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;