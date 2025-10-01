import React from 'react';

const DebugPanel = ({ user, isAuthenticated, loading, completedModules }) => {
  if (!window.location.hostname.includes('localhost')) return null; // Only show in dev
  
  return (
    <div className="fixed bottom-0 left-0 bg-black text-white text-xs p-2 max-w-sm">
      <div className="font-bold">Debug Panel:</div>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      <div>User ID: {user?.id || 'None'}</div>
      <div>User Email: {user?.email || 'None'}</div>
      <div>Completed Modules: [{completedModules.join(', ')}]</div>
    </div>
  );
};

export default DebugPanel;