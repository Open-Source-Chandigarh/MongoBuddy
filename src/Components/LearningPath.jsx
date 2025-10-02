import React, { useState, useEffect } from 'react';
import BearMascot from './BearMascot';

const LearningPath = ({ onModuleSelect, completedModules }) => {
  // Use completedModules from props (which comes from AuthContext via App.jsx)
  const [completedCheckpoints, setCompletedCheckpoints] = useState(completedModules || []);
  
  // Sync local state when completedModules prop changes
  useEffect(() => {
    setCompletedCheckpoints(completedModules || []);
  }, [completedModules]);
  
  // Calculate current checkpoint based on completed modules
  const currentCheckpoint = completedModules?.length || 0;

  // Function to check if a module is unlocked (accessible)
  const isModuleUnlocked = (checkpointId) => {
    // First module (checkpoint 0) is always unlocked
    if (checkpointId === 0) return true;
    
    // Module is unlocked if the previous module is completed
    return completedCheckpoints.includes(checkpointId - 1);
  };

  const checkpoints = [
    {
      id: 0,
      title: "What is MongoDB?",
      description: "Introduction to NoSQL databases",
      type: "start",
      questions: 3,
      xp: 50
    },
    {
      id: 1,
      title: "Documents & Collections",
      description: "Understanding MongoDB structure",
      type: "checkpoint",
      questions: 5,
      xp: 75
    },
    {
      id: 2,
      title: "Task 1",
      description: "Practice what you've learned",
      type: "task",
      questions: 0,
      xp: 60
    },
     {
      id: 3,
      title: "Installation Guide",
      description: "Install MongoDB Compass & Shell",
      type: "installation",
      questions: 0,
      xp: 50
    },
    {
      id: 4,
      title: "CRUD Operations",
      description: "Create, Read, Update, Delete",
      type: "checkpoint",
      questions: 8,
      xp: 100
    },
    {
      id: 5,
      title: "Task 2",
      description: "Practice CRUD operations",
      type: "task",
      questions: 0,
      xp: 80
    },
    {
      id: 6,
      title: "Implement Queries on MongoDB Shell",
      description: "Learn shell commands and queries",
      type: "checkpoint",
      questions: 8,
      xp: 100
    },
    {
      id: 7,
      title: "Queries & Filters",
      description: "Finding and filtering data",
      type: "checkpoint",
      questions: 6,
      xp: 85
    },
    {
      id: 8,
      title: "Indexing",
      description: "Optimizing query performance",
      type: "checkpoint",
      questions: 8,
      xp: 90
    },
    {
      id: 9,
      title: "Aggregation Pipeline",
      description: "Advanced data processing",
      type: "checkpoint",
      questions: 7,
      xp: 120
    },
    {
      id: 10,
      title: "Mongo DB Expert ",
      description: "Test Yourself with interview Questions",
      type: "checkpoint",
      questions: 10,
      xp: 150
    },
    
  ];

  const handleCheckpointClick = (checkpointId) => {
    // Check if the module is unlocked
    if (!isModuleUnlocked(checkpointId)) {
      console.log('Module is locked. Complete previous modules first.');
      return;
    }

    // Allow access to unlocked checkpoints
    console.log(`Starting checkpoint: ${checkpoints[checkpointId].title}`);
    
    // Navigate to specific modules using the onModuleSelect prop
    if (checkpointId === 0) {
      onModuleSelect('module1');
    } else if (checkpointId === 1) {
      onModuleSelect('module2');
    } else if (checkpointId === 2) {
      onModuleSelect('task1');
    } else if (checkpointId === 3) {
      onModuleSelect('installation');
    } else if (checkpointId === 4) {
      onModuleSelect('module3');
    } else if (checkpointId === 5) {
      onModuleSelect('task2');
    } else if (checkpointId === 6) {
      onModuleSelect('module4');
    } else if (checkpointId === 7) {
      onModuleSelect('module5');
    } else if (checkpointId === 8) {
      onModuleSelect('module6');
    } else if (checkpointId === 9) {
      onModuleSelect('module7');
    } else if (checkpointId === 10) {
      onModuleSelect('module8');
    }
  };

  const getCheckpointStatus = (checkpointId) => {
    if (completedCheckpoints.includes(checkpointId)) return 'completed';
    if (isModuleUnlocked(checkpointId)) return 'available';
    return 'locked';
  };

  const getCheckpointColor = (checkpoint) => {
    const status = getCheckpointStatus(checkpoint.id);
    
    switch (status) {
      case 'completed': 
        if (checkpoint.type === 'start') return 'bg-green-500';
        if (checkpoint.type === 'end') return 'bg-red-500';
        if (checkpoint.type === 'task') return 'bg-purple-500';
        if (checkpoint.type === 'installation') return 'bg-blue-500';
        return 'bg-yellow-500';
      case 'available': 
        if (checkpoint.type === 'start') return 'bg-green-400';
        if (checkpoint.type === 'end') return 'bg-red-400';
        if (checkpoint.type === 'task') return 'bg-purple-400';
        if (checkpoint.type === 'installation') return 'bg-blue-400';
        return 'bg-yellow-400';
      case 'locked':
      default: 
        return 'bg-gray-400 opacity-50';
    }
  };

  const renderPathLine = (fromIndex) => {
    const isEven = fromIndex % 2 === 0;
    
    return (
      <div className="relative flex items-center justify-center h-24">
        <svg width="200" height="100" className="absolute">
          <path
            d={isEven 
              ? "M 50 20 Q 100 10, 150 80" 
              : "M 150 20 Q 100 10, 50 80"
            }
            stroke="#60A5FA"
            strokeWidth="3"
            strokeDasharray="8,4"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <BearMascot size="80px" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            <span className="text-blue-600">START YOUR JOURNEY</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master MongoDB through interactive checkpoints
          </p>
          
          {/* Progress Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">{completedCheckpoints.length}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">{currentCheckpoint + 1}</div>
              <div className="text-gray-600">Current Level</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-yellow-600">
                {completedCheckpoints.reduce((total, id) => total + checkpoints[id-1]?.xp || 0, 0)}
              </div>
              <div className="text-gray-600">Total XP</div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="relative">
          {checkpoints.map((checkpoint, index) => (
            <div key={checkpoint.id} className="mb-8">
              
              {/* Checkpoint */}
              <div className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-4`}>
                <div className="relative">
                  
                  {/* Checkpoint Circle */}
                  <button
                    onClick={() => handleCheckpointClick(checkpoint.id)}
                    disabled={getCheckpointStatus(checkpoint.id) === 'locked'}
                    className={`
                      w-32 h-32 rounded-full border-4 border-gray-800 flex items-center justify-center
                      transform transition-all duration-300 hover:scale-110 relative
                      ${getCheckpointColor(checkpoint)}
                      ${getCheckpointStatus(checkpoint.id) === 'locked' 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'cursor-pointer hover:shadow-lg'
                      }
                    `}
                  >
                    
                    {/* Lock Icon for Locked Modules */}
                    {getCheckpointStatus(checkpoint.id) === 'locked' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Checkpoint Content */}
                    {checkpoint.type === 'start' && (
                      <span className="text-white font-bold text-lg">START</span>
                    )}
                    
                    {checkpoint.type === 'end' && (
                      <span className="text-white font-bold text-lg">END</span>
                    )}
                    
                    {checkpoint.type === 'checkpoint' && (
                      <div className="text-center text-white">
                        {getCheckpointStatus(checkpoint.id) === 'completed' ? (
                          <div className="text-3xl">✓</div>
                        ) : getCheckpointStatus(checkpoint.id) === 'locked' ? (
                          <div className="text-3xl">🔒</div>
                        ) : (
                          <div className="text-3xl">✓</div>
                        )}
                      </div>
                    )}
                    
                    {checkpoint.type === 'task' && (
                      <div className="text-center text-white relative">
                        {getCheckpointStatus(checkpoint.id) === 'locked' ? (
                          <div className="text-3xl">🔒</div>
                        ) : (
                          <div className="relative flex items-center justify-center">
                            <BearMascot size="80px" />
                            <div className="absolute -bottom-2 -right-2 text-2xl">✏️</div>
                            {getCheckpointStatus(checkpoint.id) === 'completed' && (
                              <div className="absolute -top-1 -right-1 rounded-full w-6 h-6 flex items-center justify-center">
                               
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {checkpoint.type === 'installation' && (
                      <div className="text-center text-white relative">
                        {getCheckpointStatus(checkpoint.id) === 'locked' ? (
                          <div className="text-3xl">🔒</div>
                        ) : (
                          <div className="relative flex items-center justify-center">
                            <div className="text-4xl">⚙️</div>
                            <div className="absolute -bottom-2 -right-2 text-2xl">📦</div>
                            {getCheckpointStatus(checkpoint.id) === 'completed' && (
                              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                ✓
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Bear Mascot only for task checkpoints - removed from other checkpoints */}
                  </button>
                  
                  {/* Checkpoint Info Card */}
                  <div className={`
                    absolute ${index % 2 === 0 ? 'left-40' : 'right-40'} top-1/2 transform -translate-y-1/2
                    bg-white rounded-lg p-4 shadow-lg border-2 border-gray-200 min-w-64
                    ${getCheckpointStatus(checkpoint.id) === 'locked' ? 'opacity-50' : ''}
                  `}>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {checkpoint.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {checkpoint.description}
                    </p>
                    
                    {checkpoint.type === 'checkpoint' && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>📝 {checkpoint.questions} Questions</span>
                        <span>⭐ {checkpoint.xp} XP</span>
                      </div>
                    )}
                    
                    {checkpoint.type === 'task' && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>📋 Practice Task</span>
                        <span>⭐ {checkpoint.xp} XP</span>
                      </div>
                    )}

                    {checkpoint.type === 'installation' && (
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>📦 Installation Guide</span>
                        <span>⭐ {checkpoint.xp} XP</span>
                      </div>
                    )}
                    
                    {getCheckpointStatus(checkpoint.id) !== 'locked' && (
                      <button 
                        onClick={() => handleCheckpointClick(checkpoint.id)}
                        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {getCheckpointStatus(checkpoint.id) === 'completed' ? 'Play' : 'Start'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Path Line to Next Checkpoint */}
              {index < checkpoints.length - 1 && renderPathLine(index)}
            </div>
          ))}
        </div>
        
        {/* Achievement Section */}
        <div className="text-center mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🏆 Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(completedCheckpoints.length / (checkpoints.length - 1)) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-600">
            Complete all checkpoints to become a MongoDB Expert!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
