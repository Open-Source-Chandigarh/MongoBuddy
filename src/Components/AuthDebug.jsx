import { useAuth } from '../contexts/AuthContext';

function AuthDebug() {
  const { user, isAuthenticated, loading, session } = useAuth();
  
  console.log('AuthDebug - Current state:', {
    user,
    isAuthenticated,
    loading,
    session,
    timestamp: new Date().toLocaleTimeString()
  });

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>User: {user?.email || 'None'}</div>
      <div>Time: {new Date().toLocaleTimeString()}</div>
    </div>
  );
}

export default AuthDebug;