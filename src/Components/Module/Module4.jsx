import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Book, Terminal, Code, Copy } from 'lucide-react';
import BearMascot from '../BearMascot';
import step1 from '../../assets/pics/step1.png';
import step2 from '../../assets/pics/step2.png';
import step3 from '../../assets/pics/step3.png';
import step4one from '../../assets/pics/step4-1.png';
import step4two from '../../assets/pics/step4-2.png';
import step4three from '../../assets/pics/step4-3.png';
import step4four from '../../assets/pics/step4-4.png';
import step4five from '../../assets/pics/step4-5.png';
import step4six from '../../assets/pics/step4-6.png';
import step5 from '../../assets/pics/step5.png'

const Module4 = ({ onBackToPath, onModuleComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Sample shell steps data
  const shellSteps = [
    {
      id: 1,
      title: "Opening MongoDB Shell",
      description: "Learn how to connect to MongoDB using the shell",
      content: "Open windows powershell and run mongosh command. If MongoDB Shell is installed it finds the path and runs it. If a MongoDB server is running, you’ll see a prompt like: \"test>\" where test is the default database.",
      screenshot: step1,
      screenshotAlt: "MongoDB shell connection screen showing successful connection to local database"
    },
    {
      id: 2,
      title: "Basic Database Operations",
      description: "Learn how to create and check databases",
      content: ["You can check the default databases present using show dbs command. ",
        "Admin, Config, local and test are already present by default ",
        "Then if you want to create a new database you will simply write \"use\" and the name of your database. You will be able to see the name of your database in place of test and this means you are working in your database now",
        "Then we will create a collection using createCollection() function",
        "You will see {ok:1}, It’s MongoDB’s way of saying “The command was successful.”"
      ],
       screenshot: step2,
      screenshotAlt: "MongoDB shell showing database creation and basic operations"
    },
    {
      id: 3,
      title: "Inserting Documents",
      description: "Learn different ways to insert documents into collections",
      content: "MongoDB provides several methods to insert documents: insertOne() for single documents and insertMany() for multiple documents.",
      screenshot:step3,
      screenshotAlt: "MongoDB shell showing insert operations with success confirmations"
    },
    {
      id: 4,
      title: "Querying Documents",
      description: "Learn how to retrieve documents using find() method",
      content: [
        {
          type: "text",
          content: "The simple find() method is used to query documents in a collection. It returns all documents of the collection"
        },
        {
          type: "image",
          src: step4one,
          alt: "MongoDB shell showing basic find operations"
        },
        {
          type: "text",
          content: "You can find the documents with specific condition for example with specific name."
        },
        {
          type: "image",
          src: step4two,
          alt: "MongoDB shell showing conditional queries"
        },
        {
          type: "text",
          content: "You can find the documents with specific condition for example with specific range here gt means (greater than) and gte means (greater than equal to)."
        },
        {
          type: "image",
          src: step4three,
          alt: "MongoDB shell showing find all results"
        },
        
        {
          type: "image",
          src: step4four,
          alt: "MongoDB shell showing find all results"
        },
        {
          type: "text",
          content: "Inclusion projection- When we want only few columns to be displayed"
        },
        {
          type: "image",
          src: step4five,
          alt: "MongoDB shell showing find all results"
        },
        {
          type: "text",
          content: "Exclusion projection- When we want only few columns to be hidden"
        },
        
      ],

      screenshot: step4six,
      screenshotAlt: "MongoDB shell showing various find operations and results"
    },
    {
      id: 5,
      title: "Query Operators",
      description: "Learn advanced query operators for complex filtering",
      content: ["MongoDB provides many operators for complex queries including comparison, logical, and array operators.",
        "Comparison: $eq (equal), $ne (not equal), $gte (greater than or equal), $lt (less than), $lte (less than or equal) ",
        "Logical Operators: $and , $or, $not , $nor",
        "For example- AND → students age > 22 AND gpa > 3.5"
      ],
    
      screenshot: step5,
      screenshotAlt: "MongoDB shell showing query operators in action"
    },
    {
      id: 6,
      title: "Updating Documents",
      description: "Learn how to modify existing documents",
      content: "MongoDB provides update operations to modify documents: updateOne(), updateMany(), and replaceOne().",
      codeExample: `// Update a single document
db.students.updateOne(
  { name: "John Doe" },
  { $set: { gpa: 3.7, major: "Data Science" } }
)

// Update multiple documents
db.students.updateMany(
  { major: "Computer Science" },
  { $set: { department: "Engineering" } }
)

// Increment a field
db.students.updateOne(
  { name: "Alice Smith" },
  { $inc: { age: 1 } }
)

// Add to array
db.students.updateOne(
  { name: "Bob Johnson" },
  { $push: { courses: "Quantum Physics" } }
)`,
      screenshot: "/screenshots/mongosh-update.png",
      screenshotAlt: "MongoDB shell showing update operations and results"
    },
    {
      id: 7,
      title: "Deleting Documents",
      description: "Learn how to remove documents from collections",
      content: "MongoDB provides delete operations to remove documents: deleteOne() and deleteMany().",
      codeExample: `// Delete a single document
db.students.deleteOne({ name: "John Doe" })

// Delete multiple documents
db.students.deleteMany({ major: "Chemistry" })

// Delete all documents (but keep collection)
db.students.deleteMany({})

// Find and delete (returns deleted document)
db.students.findOneAndDelete({ age: { $lt: 18 } })`,
      screenshot: "/screenshots/mongosh-delete.png",
      screenshotAlt: "MongoDB shell showing delete operations and confirmations"
    },
   {
      id: 8,
      title: "Cursor Methods",
      description:"" ,
      content: ["Count: find().count() -> returns the number of documents",
        "forEach: find().forEach(doc=>(print(doc.name))) -> prints all the names from each document",
        "Sort: find().sort({age:-1})  ->  1 for ascending order -1 for descending order",
        "Limit: find().limit(5)  -> returns only 5 documents ",
        "Skip:  find().skip(5)   -> skip the first 5 documents",

      ],
      
      screenshot: "/screenshots/mongosh-indexes.png",
      screenshotAlt: "MongoDB shell showing index creation and management"
    },
/*    {
      id: 9,
      title: "Aggregation Basics",
      description: "Learn basic aggregation pipeline operations",
      content: "The aggregation pipeline allows you to process data through multiple stages to transform and analyze documents.",
      codeExample: `// Basic aggregation pipeline
db.students.aggregate([
  { $match: { age: { $gte: 21 } } },
  { $group: { 
    _id: "$major", 
    averageGPA: { $avg: "$gpa" },
    count: { $sum: 1 }
  } },
  { $sort: { averageGPA: -1 } }
])

// Project specific fields
db.students.aggregate([
  { $project: { 
    name: 1, 
    major: 1, 
    gpaRounded: { $round: ["$gpa", 1] }
  } }
])`,
      screenshot: "/screenshots/mongosh-aggregation.png",
      screenshotAlt: "MongoDB shell showing aggregation pipeline results"
    },
    {
      id: 10,
      title: "Advanced Operations",
      description: "Learn advanced MongoDB shell operations and utilities",
      content: "Explore advanced features like transactions, bulk operations, and administrative commands.",
      codeExample: `// Bulk operations
var bulk = db.students.initializeUnorderedBulkOp();
bulk.insert({ name: "Student1", age: 20 });
bulk.insert({ name: "Student2", age: 21 });
bulk.execute();

// Collection statistics
db.students.stats()

// Database statistics
db.stats()

// Create capped collection
db.createCollection("logs", { capped: true, size: 100000, max: 100 })

// Text search
db.students.find({ $text: { $search: "Computer Science" } })`,
      screenshot: "/screenshots/mongosh-advanced.png",
      screenshotAlt: "MongoDB shell showing advanced operations and administrative commands"
    } */
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
         <img 
            src={src}
            alt={alt}
            className="w-full max-w-3xl mx-auto rounded-lg border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                              
            />
      <div className="flex flex-col items-center justify-center">
        
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
                onClick={onBackToPath}
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
                  {Array.isArray(currentStepData.content) ? (
                    <div className="space-y-6">
                      {currentStepData.content.map((item, index) => {
                        if (typeof item === 'string') {
                          // Handle legacy string array format
                          return (
                            <div key={index} className="flex items-start">
                              <span className="text-green-600 mr-2 mt-1">•</span>
                              <span className="text-gray-600 leading-relaxed">{item}</span>
                            </div>
                          );
                        } else if (item.type === 'text') {
                          // Handle new text content
                          return (
                            <div key={index} className="flex items-start">
                              <span className="text-green-600 mr-2 mt-1">•</span>
                              <span className="text-gray-600 leading-relaxed">{item.content}</span>
                            </div>
                          );
                        } else if (item.type === 'image') {
                          // Handle new image content
                          return (
                            <div key={index} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <img 
                                src={item.src}
                                alt={item.alt}
                                className="w-full max-w-2xl mx-auto rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{currentStepData.content}</p>
                  )}
                </div>

                {/* Code Example Section */}
                {currentStepData.codeExample && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-gray-700 font-medium">
                        <Code className="w-4 h-4 mr-2 text-green-600" />
                        Example
                      </div>
                      <button
                        onClick={() => copyToClipboard(currentStepData.codeExample)}
                        className="flex items-center px-2 py-1 text-xs sm:text-sm text-green-700 hover:text-green-800 hover:bg-green-50 rounded border border-green-200"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 text-sm rounded-lg p-4 overflow-auto">
                      <code>{currentStepData.codeExample}</code>
                    </pre>
                  </div>
                )}

                {/* Screenshot Section */}
                <div className="mb-8">
                 
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
                        onClick={() => onModuleComplete(6, 10, 10)}
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
