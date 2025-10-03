import React, { useState } from 'react';
import BearMascot from '../BearMascot';
import pic1 from "../../assets/pics/pic1.png";
import pic2 from "../../assets/pics/pic2.png";
import pic3 from "../../assets/pics/pic3.png"
import pic4 from "../../assets/pics/image.png";

const Installation = ({ onBackToPath, onModuleComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const markStepCompleted = (stepNumber) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const completeModule = () => {
    // Pass checkpoint ID (3 for Installation), score, and total questions
    onModuleComplete(3, 1, 1);
    onBackToPath();
  };

  const installationSteps = {
    compass: [
      {
        title: "Download MongoDB Compass",
        content: "Go to the official MongoDB website at https://www.mongodb.com/try/download/community",
        code: "https://www.mongodb.com/try/download/compass",
        image: "🌐",
        screenshot: pic1,
        screenshotAlt: "MongoDB Compass download page showing Windows download options"
      },
      
      {
        title: "Select Windows Version",
        content: "Choose the Windows installer appropriate for your system (64-bit recommended)",
        code: "mongodb-compass-1.40.4-win32-x64.exe",
        image: "💻",
        screenshot: pic2,
        screenshotAlt: "MongoDB Compass version selection page highlighting Windows 64-bit installer"
      },
      {
        title: "Run the Installer",
        content: "Double-click the downloaded .exe file and follow the installation wizard",
        code: "Right-click → 'Run as administrator' (recommended)",
        image: "⚙️",
        screenshotAlt: "MongoDB Compass installation wizard welcome screen"
      },
      {
        title: "Launch MongoDB Compass",
        content: "Find MongoDB Compass in your Start menu or desktop and launch it",
        code: "Start → MongoDB Compass",
        image: "🚀",
        screenshotAlt: "MongoDB Compass welcome screen after first launch"
      }
    ],
    shell: [
      {
        title: "Go to Mongo DB tools",
        content: "Visit https://www.mongodb.com/try/download/tools ",
        image: "",
        screenshot:pic3,
        screenshotAlt: "MongoDB Community Server download page with Windows option selected"
      },
      {
        title: "Install Mongo DB Shell",
        content: "Select Windows and download msi installer", 
        image: "",
        screenshot:pic4,
        screenshotAlt: "MongoDB Server installation wizard showing Complete installation option"
      },
      {
        title: "Run the installer",
        content: "Run the .msi installer and choose 'Complete' installation",
        image: "🛤️",
        screenshotAlt: "Windows Environment Variables dialog showing PATH configuration"
      },
      {
        title: "Verify Installation",
        content: "Open any powershell and run the command mongosh --version to test the MongoDB shell(Mongosh)",
        image: "✅",
        screenshotAlt: "Command Prompt showing mongosh version output confirming successful installation"
      }
    ]
  };

  const currentSteps = currentStep === 1 ? 
    installationSteps.compass : 
    installationSteps.shell;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToPath}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Learning Path</span>
            </button>
            <div className="flex items-center space-x-3">
              <BearMascot size="40px" />
              <h1 className="text-2xl font-bold text-gray-800">MongoDB Installation Guide - Windows</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {completedSteps.length}/{currentSteps.length} steps completed
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Installation Type Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Installation Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentStep(1)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                currentStep === 1
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-2">🧭</div>
              <h3 className="font-bold">MongoDB Compass</h3>
              <p className="text-sm text-gray-600">GUI tool for managing MongoDB</p>
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                currentStep === 2
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold">MongoDB Shell</h3>
              <p className="text-sm text-gray-600">Command-line interface</p>
            </button>
          </div>
        </div>

        {/* Operating System Selector - Removed, Windows only */}

        {/* Installation Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {currentStep === 1 ? 'MongoDB Compass Installation' : 'MongoDB Shell Installation'}
            </h2>
            <div className="text-sm text-gray-500">
              Windows
            </div>
          </div>

          <div className="space-y-6">
            {currentSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = completedSteps.includes(stepNumber);
              
              return (
                <div
                  key={stepNumber}
                  className={`border rounded-lg p-6 transition-colors ${
                    isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? '✓' : stepNumber}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{step.image}</span>
                        <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{step.content}</p>
                      
                      {/* Screenshot */}
                      {step.screenshot && (
                        <div className="mb-6">
                          
                          <div className="relative">
                            <img 
                              src={step.screenshot}
                              alt={step.screenshotAlt}
                              className="w-full max-w-3xl mx-auto rounded-lg border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                              onError={(e) => {
                                // Fallback for missing screenshots
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                            <div 
                              className="hidden w-full max-w-3xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center"
                            >
                              <div className="text-5xl mb-3 opacity-50">📷</div>
                              <p className="text-gray-600 font-medium text-lg mb-2">Screenshot Coming Soon</p>
                              <p className="text-gray-500 text-sm mb-3">{step.screenshotAlt}</p>
                              <div className="bg-white px-3 py-1 rounded text-xs text-gray-400 inline-block">
                                {step.screenshot}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                     
                      
                      <div className="mt-4">
                        <button
                          onClick={() => markStepCompleted(stepNumber)}
                          disabled={isCompleted}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            isCompleted
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion Section */}
          {completedSteps.length === currentSteps.length && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🎉</div>
                <h3 className="text-xl font-bold text-green-800">
                  {currentStep === 1 ? 'MongoDB Compass' : 'MongoDB Shell'} Installation Complete!
                </h3>
              </div>
              <p className="text-green-700 mb-4">
                Great job! You've successfully installed{' '}
                {currentStep === 1 ? 'MongoDB Compass' : 'MongoDB Shell'}.
                {currentStep === 1 && currentSteps.length < installationSteps.shell.length
                  ? ' Consider installing MongoDB Shell as well for command-line access.'
                  : ''}
              </p>
              
              <div className="flex space-x-4">
                {currentStep === 1 && (
                  <button
                    onClick={() => {
                      setCurrentStep(2);
                      setCompletedSteps([]);
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Install MongoDB Shell →
                  </button>
                )}
                
                <button
                  onClick={completeModule}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Complete Installation Module
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-800 mb-3">💡 Quick Tips</h3>
          <ul className="text-yellow-700 space-y-2">
            <li>• MongoDB Compass provides a visual interface for managing your databases</li>
            <li>• MongoDB Shell (mongosh) allows you to interact with MongoDB via command line</li>
            <li>• Both tools are essential for different workflows - GUI for exploration, CLI for automation</li>
            <li>• Make sure to verify your installation by testing the connection</li>
          </ul>
        </div>

       
      </div>
    </div>
  );
};

export default Installation;
