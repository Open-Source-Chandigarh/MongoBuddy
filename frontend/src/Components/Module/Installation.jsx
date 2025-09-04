import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Installation = ({ onBackToPath, onModuleComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedOS, setSelectedOS] = useState('windows');

  const markStepCompleted = (stepNumber) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const completeModule = () => {
    onModuleComplete('installation', 100);
    onBackToPath();
  };

  const installationSteps = {
    windows: {
      compass: [
        {
          title: "Download MongoDB Compass",
          content: "Go to the official MongoDB website at mongodb.com/try/download/compass",
          code: "https://www.mongodb.com/try/download/compass",
          image: "🌐",
          screenshot: "/screenshots/compass-download-page.png",
          screenshotAlt: "MongoDB Compass download page showing Windows download options"
        },
        {
          title: "Select Windows Version",
          content: "Choose the Windows installer (.exe) appropriate for your system (64-bit recommended)",
          code: "mongodb-compass-1.40.4-win32-x64.exe",
          image: "💻",
          screenshot: "/screenshots/compass-version-selection.png",
          screenshotAlt: "MongoDB Compass version selection page highlighting Windows 64-bit installer"
        },
        {
          title: "Run the Installer",
          content: "Double-click the downloaded .exe file and follow the installation wizard",
          code: "Right-click → 'Run as administrator' (recommended)",
          image: "⚙️",
          screenshot: "/screenshots/compass-installer-wizard.png",
          screenshotAlt: "MongoDB Compass installation wizard welcome screen"
        },
        {
          title: "Launch MongoDB Compass",
          content: "Find MongoDB Compass in your Start menu or desktop and launch it",
          code: "Start → MongoDB Compass",
          image: "🚀",
          screenshot: "/screenshots/compass-first-launch.png",
          screenshotAlt: "MongoDB Compass welcome screen after first launch"
        }
      ],
      shell: [
        {
          title: "Download MongoDB Community Server",
          content: "Visit mongodb.com/try/download/community and select Windows",
          code: "https://www.mongodb.com/try/download/community",
          image: "📦",
          screenshot: "/screenshots/mongodb-community-download.png",
          screenshotAlt: "MongoDB Community Server download page with Windows option selected"
        },
        {
          title: "Install MongoDB Server",
          content: "Run the .msi installer and choose 'Complete' installation",
          code: "mongodb-windows-x86_64-7.0.4.msi",
          image: "🔧",
          screenshot: "/screenshots/mongodb-server-installation.png",
          screenshotAlt: "MongoDB Server installation wizard showing Complete installation option"
        },
        {
          title: "Add to System PATH",
          content: "Add MongoDB bin directory to your system PATH environment variable",
          code: "C:\\Program Files\\MongoDB\\Server\\7.0\\bin",
          image: "🛤️",
          screenshot: "/screenshots/windows-path-environment.png",
          screenshotAlt: "Windows Environment Variables dialog showing PATH configuration"
        },
        {
          title: "Verify Installation",
          content: "Open Command Prompt and test the MongoDB shell",
          code: "mongosh --version",
          image: "✅",
          screenshot: "/screenshots/mongosh-version-output.png",
          screenshotAlt: "Command Prompt showing mongosh version output confirming successful installation"
        }
      ]
    },
    mac: {
      compass: [
        {
          title: "Download MongoDB Compass",
          content: "Go to mongodb.com/try/download/compass and select macOS",
          code: "https://www.mongodb.com/try/download/compass",
          image: "🍎",
          screenshot: "/screenshots/compass-macos-download.png",
          screenshotAlt: "MongoDB Compass download page with macOS option selected"
        },
        {
          title: "Install the Application",
          content: "Open the downloaded .dmg file and drag MongoDB Compass to Applications",
          code: "Drag to /Applications folder",
          image: "📱",
          screenshot: "/screenshots/macos-dmg-install.png",
          screenshotAlt: "macOS DMG installer window showing drag-to-Applications installation"
        },
        {
          title: "Launch Compass",
          content: "Open Applications folder and double-click MongoDB Compass",
          code: "Applications → MongoDB Compass",
          image: "🚀",
          screenshot: "/screenshots/macos-applications-folder.png",
          screenshotAlt: "macOS Applications folder showing MongoDB Compass icon"
        }
      ],
      shell: [
        {
          title: "Install via Homebrew",
          content: "Use Homebrew package manager to install MongoDB",
          code: "brew tap mongodb/brew\nbrew install mongodb-community",
          image: "🍺",
          screenshot: "/screenshots/macos-homebrew-install.png",
          screenshotAlt: "Terminal showing Homebrew MongoDB installation commands and output"
        },
        {
          title: "Start MongoDB Service",
          content: "Start the MongoDB service using brew services",
          code: "brew services start mongodb/brew/mongodb-community",
          image: "▶️",
          screenshot: "/screenshots/macos-mongodb-service-start.png",
          screenshotAlt: "Terminal showing MongoDB service start command and success message"
        },
        {
          title: "Install MongoDB Shell",
          content: "Install the MongoDB Shell (mongosh) separately",
          code: "brew install mongosh",
          image: "🐚",
          screenshot: "/screenshots/macos-mongosh-install.png",
          screenshotAlt: "Terminal showing mongosh installation via Homebrew"
        },
        {
          title: "Verify Installation",
          content: "Test the MongoDB shell connection",
          code: "mongosh",
          image: "✅",
          screenshot: "/screenshots/macos-mongosh-connect.png",
          screenshotAlt: "Terminal showing successful mongosh connection to MongoDB"
        }
      ]
    },
    linux: {
      compass: [
        {
          title: "Download MongoDB Compass",
          content: "Download the .deb or .rpm package for your Linux distribution",
          code: "https://www.mongodb.com/try/download/compass",
          image: "🐧",
          screenshot: "/screenshots/compass-linux-download.png",
          screenshotAlt: "MongoDB Compass download page showing Linux package options"
        },
        {
          title: "Install Package",
          content: "Install using your package manager",
          code: "sudo dpkg -i mongodb-compass_*.deb\n# or\nsudo rpm -i mongodb-compass-*.rpm",
          image: "📦",
          screenshot: "/screenshots/linux-package-install.png",
          screenshotAlt: "Terminal showing MongoDB Compass package installation on Linux"
        },
        {
          title: "Launch Compass",
          content: "Start MongoDB Compass from applications menu or terminal",
          code: "mongodb-compass",
          image: "🚀",
          screenshot: "/screenshots/linux-compass-launch.png",
          screenshotAlt: "Linux desktop showing MongoDB Compass in applications menu"
        }
      ],
      shell: [
        {
          title: "Import MongoDB GPG Key",
          content: "Add MongoDB's official GPG key to your system",
          code: "wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -",
          image: "🔑",
          screenshot: "/screenshots/linux-gpg-key-import.png",
          screenshotAlt: "Terminal showing GPG key import command and OK response"
        },
        {
          title: "Add MongoDB Repository",
          content: "Add MongoDB repository to your package sources",
          code: "echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list",
          image: "📋",
          screenshot: "/screenshots/linux-repo-add.png",
          screenshotAlt: "Terminal showing MongoDB repository addition to sources list"
        },
        {
          title: "Install MongoDB",
          content: "Update package database and install MongoDB",
          code: "sudo apt-get update\nsudo apt-get install -y mongodb-org",
          image: "⬇️",
          screenshot: "/screenshots/linux-mongodb-install.png",
          screenshotAlt: "Terminal showing MongoDB package installation progress"
        },
        {
          title: "Start MongoDB Service",
          content: "Start and enable MongoDB service",
          code: "sudo systemctl start mongod\nsudo systemctl enable mongod",
          image: "▶️",
          screenshot: "/screenshots/linux-service-start.png",
          screenshotAlt: "Terminal showing MongoDB service start and enable commands"
        }
      ]
    }
  };

  const currentSteps = currentStep === 1 ? 
    installationSteps[selectedOS].compass : 
    installationSteps[selectedOS].shell;

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
              <h1 className="text-2xl font-bold text-gray-800">MongoDB Installation Guide</h1>
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

        {/* Operating System Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Operating System</h2>
          <div className="flex flex-wrap gap-4">
            {['windows', 'mac', 'linux'].map((os) => (
              <button
                key={os}
                onClick={() => setSelectedOS(os)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedOS === os
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {os === 'windows' && '🪟 Windows'}
                {os === 'mac' && '🍎 macOS'}
                {os === 'linux' && '🐧 Linux'}
              </button>
            ))}
          </div>
        </div>

        {/* Installation Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {currentStep === 1 ? 'MongoDB Compass Installation' : 'MongoDB Shell Installation'}
            </h2>
            <div className="text-sm text-gray-500">
              {selectedOS.charAt(0).toUpperCase() + selectedOS.slice(1)}
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
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="text-lg mr-2">📷</span>
                            Visual Guide
                          </h4>
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
                      
                      {step.code && (
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                          <pre>{step.code}</pre>
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
                {currentStep === 1 && currentSteps.length < installationSteps[selectedOS].shell.length
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

        {/* Screenshot Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-3">📷 About Screenshots</h3>
          <p className="text-blue-700 mb-3">
            This installation guide includes visual screenshots for each step to make the process easier to follow.
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">For Developers:</h4>
            <p className="text-blue-700 text-sm mb-2">
              To add actual screenshots, place image files in the <code className="bg-blue-200 px-1 rounded">public/screenshots/</code> directory.
              See the README.md file in that directory for detailed instructions.
            </p>
            <p className="text-blue-600 text-xs">
              Missing screenshots will automatically show helpful placeholders with descriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Installation;
