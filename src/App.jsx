import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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
import AuthForm from '@/Components/Auth/AuthForm';
import { SupabaseProgressService } from './services/supabaseProgressService';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    user, 
    isAuthenticated, 
    loading, 
    signOut,
    completedModules: authCompletedModules,
    fetchUserData
  } = useAuth();

  const completedModules = authCompletedModules || [];

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

  useEffect(() => {
    console.log('Auth state changed:', { 
      isAuthenticated, 
      currentPath: location.pathname,
      userEmail: user?.email,
      loading 
    });
    
    if (!loading && isAuthenticated && location.pathname === '/auth') {
      console.log('Redirecting to learning path...');
      setTimeout(() => {
        navigate('/learning');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [isAuthenticated, location.pathname, loading, user, navigate]);

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/learning');
    } else {
      navigate('/auth');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToModules = () => {
    if (isAuthenticated) {
      navigate('/learning');
    } else {
      navigate('/auth');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeModule = async (moduleNumber, score = null, totalQuestions = null) => {
    if (!completedModules.includes(moduleNumber)) {
      if (isAuthenticated && user && score !== null && totalQuestions !== null) {
        try {
          const moduleName = getModuleNameFromId(moduleNumber);
          
          await SupabaseProgressService.saveModuleProgress({
            userId: user.id,
            email: user.email,
            moduleId: moduleName,
            score: score,
            totalQuestions: totalQuestions,
            timeSpent: 0
          });
          
          await SupabaseProgressService.saveCheckpointCompletion({
            userId: user.id,
            email: user.email,
            checkpointId: moduleNumber,
            score: score,
            totalQuestions: totalQuestions
          });
          
          console.log(`Progress saved for ${moduleName}: ${score}/${totalQuestions}`);
          await fetchUserData(user);
          
        } catch (error) {
          console.error('Error saving progress:', error);
        }
      }
      
      setTimeout(() => {
        navigate('/learning');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    }
  };

  const hideNavAndFooter = [
    '/module1', '/module2', '/module3', '/module4', 
    '/module5', '/module6', '/module7', '/module8',
    '/installation', '/task1', '/task2'
  ].includes(location.pathname);

  return (
    <div className="App bg-gray-50">
      {!hideNavAndFooter && (
        <Navbar 
          currentPage={location.pathname}
          onBackToHome={handleBackToHome}
          onGoToModules={handleGoToModules}
          onGetStarted={handleStartLearning}
          onBackToPath={handleGoToModules}
          onLogin={() => navigate('/auth')}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      )}

      <Routes>
        <Route path="/" element={<Home onStartLearning={handleStartLearning} />} />
        <Route 
          path="/auth" 
          element={
            <AuthForm onAuthSuccess={() => {
              console.log('onAuthSuccess callback triggered');
              navigate('/learning');
            }} />
          } 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              onLogin={() => navigate('/learning')}
              onBackToHome={handleBackToHome}
              onSwitchToSignup={() => navigate('/signup')}
            />
          } 
        />
        <Route 
          path="/signup" 
          element={
            <Signup 
              onSignup={() => navigate('/learning')}
              onBackToHome={handleBackToHome}
              onSwitchToLogin={() => navigate('/login')}
            />
          } 
        />

        <Route 
          path="/learning" 
          element={
            <ProtectedRoute>
              <LearningPath 
                onModuleSelect={(module) => navigate(`/${module}`)} 
                completedModules={completedModules}
                onBackToHome={handleBackToHome}
                user={user}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/module1" 
          element={
            <ProtectedRoute>
              <Module1 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 0, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module2" 
          element={
            <ProtectedRoute>
              <Module2 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 1, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module3" 
          element={
            <ProtectedRoute>
              <Module3 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 4, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module4" 
          element={
            <ProtectedRoute>
              <Module4 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 6, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module5" 
          element={
            <ProtectedRoute>
              <Module5 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 7, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module6" 
          element={
            <ProtectedRoute>
              <Module6 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 8, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module7" 
          element={
            <ProtectedRoute>
              <Module7 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 9, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module8" 
          element={
            <ProtectedRoute>
              <Module8 
                onModuleComplete={(moduleNumber, score, totalQuestions) => 
                  completeModule(moduleNumber || 10, score, totalQuestions)
                } 
                onBackToPath={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/installation" 
          element={
            <ProtectedRoute>
              <Installation 
                onComplete={() => completeModule('installation')} 
                onBackToLearning={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/task1" 
          element={
            <ProtectedRoute>
              <Task1 
                onComplete={() => completeModule('task1')} 
                onBackToLearning={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/task2" 
          element={
            <ProtectedRoute>
              <Taskk2 
                onComplete={() => completeModule('task2')} 
                onBackToLearning={() => navigate('/learning')} 
              />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}

      {!hideNavAndFooter && (
        <div className="fixed bottom-4 right-4 z-50">
          <BearMascot size="80px" />
          <FloatingBear></FloatingBear>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;