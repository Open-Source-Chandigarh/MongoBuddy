import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Book, Terminal, Code, Copy } from 'lucide-react';
import BearMascot from '../BearMascot';

const Module4 = ({ onBack, onNext }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Sample shell steps data
  const shellSteps = [
    {
      id: 1,
      title: "Opening MongoDB Shell",
      description: "Learn how to connect to MongoDB using the shell",
      content: "The MongoDB shell (mongosh) is an interactive JavaScript interface to MongoDB. It allows you to query and update data as well as perform administrative operations.",
      screenshot: "/screenshots/mongosh-connect.png",
      screenshotAlt: "MongoDB shell connection screen showing successful connection to local database"
    },
    {
      id: 2,
      title: "Basic Database Operations",
      description: "Learn how to create and manage databases",
      content: "In MongoDB, databases and collections are created implicitly when you first store data. You don't need to explicitly create them.",
      screenshot: "/screenshots/mongosh-database.png",
      screenshotAlt: "MongoDB shell showing database creation and basic operations"
    },
    {
      id: 3,
      title: "Inserting Documents",
      description: "Learn different ways to insert documents into collections",
      content: "MongoDB provides several methods to insert documents: insertOne() for single documents and insertMany() for multiple documents.",
      screenshot: "/screenshots/mongosh-insert.png",
      screenshotAlt: "MongoDB shell showing insert operations with success confirmations"
    },
    {
      id: 4,
      title: "Querying Documents",
      description: "Learn how to retrieve documents using find() method",
      content: "The find() method is used to query documents in a collection. You can use various filters and operators to find specific documents.",
      screenshot: "/screenshots/mongosh-find.png",
      screenshotAlt: "MongoDB shell showing various find operations and results"
    },
    {
      id: 5,
      title: "Query Operators",
      description: "Learn advanced query operators for complex filtering",
      content: "MongoDB provides many operators for complex queries including comparison, logical, and array operators.",
       screenshot: "/screenshots/mongosh-operators.png",
      screenshotAlt: "MongoDB shell showing query operators in action"
    },
    {
      id: 6,
      title: "Updating Documents",
      description: "Learn how to modify existing documents",
      content: "MongoDB provides update operations to modify documents: updateOne(), updateMany(), and replaceOne().",
      screenshot: "/screenshots/mongosh-update.png",
      screenshotAlt: "MongoDB shell showing update operations and results"
    },
    {
      id: 7,
      title: "Deleting Documents",
      description: "Learn how to remove documents from collections",
      content: "MongoDB provides delete operations to remove documents: deleteOne() and deleteMany().",
      screenshot: "/screenshots/mongosh-delete.png",
      screenshotAlt: "MongoDB shell showing delete operations and confirmations"
    },
    {
      id: 8,
      title: "Working with Indexes",
      description: "Learn how to create and manage indexes for better performance",
      content: "Indexes improve query performance by creating efficient lookup structures.",
      screenshot: "/screenshots/mongosh-indexes.png",
      screenshotAlt: "MongoDB shell showing index creation and management"
    },
    {
      id: 9,
      title: "Aggregation Basics",
      description: "Learn basic aggregation pipeline operations",
      content: "The aggregation pipeline allows you to process data through multiple stages to transform and analyze documents.",
      screenshot: "/screenshots/mongosh-aggregation.png",
      screenshotAlt: "MongoDB shell showing aggregation pipeline results"
    },
    {
      id: 10,
      title: "Advanced Operations",
      description: "Learn advanced MongoDB shell operations and utilities",
      content: "Explore advanced features like transactions, bulk operations, and administrative commands.",
     screenshot: "/screenshots/mongosh-advanced.png",
      screenshotAlt: "MongoDB shell showing advanced operations and administrative commands"
    }
  ];

  const totalSteps = shellSteps.length;
  const progress = (completedSteps.size / totalSteps) * 100;

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const ScreenshotPlaceholder = ({ alt, src }) => (
    <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <Terminal className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 font-medium mb-2">Screenshot Placeholder</p>
        <p className="text-gray-500 text-sm">{alt}</p>
        <div className="mt-2 text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
          {src}
        </div>
      </div>
    </div>
  );

  // Get current step data
  const currentStepData = shellSteps[currentStep - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Learning Path
              </button>
              
              <div className="flex items-center space-x-3">
                <BearMascot className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold text-green-800">Module 4: MongoDB Shell Queries</h1>
                  <p className="text-green-600">Master the MongoDB shell with hands-on examples</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-lg font-semibold text-green-600">
                  {completedSteps.size}/{totalSteps} Steps
                </div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-green-600" />
                Steps Overview
              </h3>
              <div className="space-y-2">
                {shellSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      {completedSteps.has(step.id) ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 mr-2 rounded-full border border-gray-300"></div>
                      )}
                      <span className="text-sm font-medium">Step {step.id}</span>
                    </div>
                    <div className="text-xs text-gray-500 ml-6 truncate">
                      {step.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-100 text-sm">Step {currentStep} of {totalSteps}</div>
                    <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                    <p className="text-green-100 mt-1">{currentStepData.description}</p>
                  </div>
                  {completedSteps.has(currentStep) && (
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  )}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-8">
                {/* Theory Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 Understanding the Concept</h3>
                  <p className="text-gray-600 leading-relaxed">{currentStepData.content}</p>
                </div>

                {/* Code Example Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-green-600" />
                      Code Example
                    </h3>
                    <button
                      onClick={() => copyToClipboard(currentStepData.codeExample)}
                      className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">MongoDB Shell</span>
                      </div>
                    </div>
                    <pre className="p-4 text-green-400 text-sm overflow-x-auto">
                      <code>{currentStepData.codeExample}</code>
                    </pre>
                  </div>
                </div>

                {/* Screenshot Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📸 Visual Example</h3>
                  <ScreenshotPlaceholder 
                    src={currentStepData.screenshot}
                    alt={currentStepData.screenshotAlt}
                  />
                </div>

                {/* Navigation and Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                      currentStep === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous Step
                  </button>

                  <div className="flex items-center space-x-3">
                    {!completedSteps.has(currentStep) && (
                      <button
                        onClick={handleStepComplete}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark Complete
                      </button>
                    )}

                    {currentStep < totalSteps ? (
                      <button
                        onClick={handleNextStep}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Next Step
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={onNext}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Complete Module
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            {completedSteps.size === totalSteps && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">Congratulations! 🎉</h3>
                    <p className="text-green-600">
                      You've completed all {totalSteps} steps of MongoDB Shell Queries. 
                      You now have the skills to effectively use the MongoDB shell for database operations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module4;
