import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module3 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  const questions = [
    {
      id: 1,
      question: "Which method is used to insert a single document into a MongoDB collection?",
      options: ["insert()", "insertOne()", "add()", "create()"],
      correct: 1,
      explanation: "insertOne() is the method used to insert a single document into a MongoDB collection."
    },
    {
      id: 2,
      question: "What does the find() method return when no query is specified?",
      options: ["Nothing", "An error", "All documents in the collection", "The first document only"],
      correct: 2,
      explanation: "When no query is specified, find() returns all documents in the collection."
    },
    {
      id: 3,
      question: "Which method updates multiple documents that match a query?",
      options: ["updateOne()", "updateMany()", "replaceOne()", "modifyMany()"],
      correct: 1,
      explanation: "updateMany() is used to update multiple documents that match the specified query criteria."
    },
    {
      id: 4,
      question: "What is the difference between deleteOne() and deleteMany()?",
      options: [
        "No difference, they are aliases",
        "deleteOne() removes the first matching document, deleteMany() removes all matching documents",
        "deleteOne() is faster than deleteMany()",
        "deleteMany() requires admin privileges"
      ],
      correct: 1,
      explanation: "deleteOne() removes only the first document that matches the query, while deleteMany() removes all documents that match the query."
    },
    {
      id: 5,
      question: "Which operator is used to set a field value in an update operation?",
      options: ["$add", "$set", "$update", "$modify"],
      correct: 1,
      explanation: "$set is the operator used to set or update the value of a field in a document."
    },
    {
      id: 6,
      question: "What does findOneAndUpdate() return by default?",
      options: [
        "The updated document",
        "The original document before update",
        "A boolean success indicator",
        "The number of modified documents"
      ],
      correct: 1,
      explanation: "findOneAndUpdate() returns the original document before the update by default. Use {returnNewDocument: true} to return the updated document."
    },
    {
      id: 7,
      question: "Which method is most efficient for inserting multiple documents?",
      options: ["Multiple insertOne() calls", "insertMany()", "bulkInsert()", "addMany()"],
      correct: 1,
      explanation: "insertMany() is more efficient for inserting multiple documents as it performs the operation in a single database call."
    },
    {
      id: 8,
      question: "What happens if you try to insert a document without specifying an _id field?",
      options: [
        "An error occurs",
        "The document is rejected",
        "MongoDB automatically generates an ObjectId for _id",
        "The _id field remains empty"
      ],
      correct: 2,
      explanation: "If no _id field is specified, MongoDB automatically generates a unique ObjectId for the _id field."
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onModuleComplete) {
      onModuleComplete(3, finalScore);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const startQuiz = () => {
    setShowTheory(false);
  };

  if (showTheory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <BearMascot size="60px" />
                <div>
                  <h1 className="text-3xl font-bold text-orange-800">📝 Module 3: CRUD Operations</h1>
                  <p className="text-gray-600">Master Create, Read, Update, Delete operations in MongoDB</p>
                </div>
              </div>
              <button
                onClick={onBackToPath}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Learning Path
              </button>
            </div>
          </div>

          {/* Theory Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="prose max-w-none">
              
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">🎯 What are CRUD Operations?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  CRUD stands for <strong>Create, Read, Update, Delete</strong> - the four basic operations you can perform on data in any database. 
                  In MongoDB, these operations allow you to manage documents within collections effectively.
                </p>
                
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                  <h3 className="font-bold text-orange-800 mb-2">💡 Quick Overview:</h3>
                  <ul className="text-orange-700 space-y-1">
                    <li><strong>Create:</strong> Insert new documents into collections</li>
                    <li><strong>Read:</strong> Query and retrieve documents from collections</li>
                    <li><strong>Update:</strong> Modify existing documents</li>
                    <li><strong>Delete:</strong> Remove documents from collections</li>
                  </ul>
                </div>
              </div>

              {/* CREATE Operations */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">➕ CREATE Operations</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. insertOne() - Insert Single Document</h3>
                <p className="text-gray-700 mb-3">Use insertOne() to insert a single document into a collection.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Insert a single user document</div>
                  <div>db.users.insertOne(&#123;</div>
                  <div className="ml-4">name: "John Doe",</div>
                  <div className="ml-4">email: "john@example.com",</div>
                  <div className="ml-4">age: 28,</div>
                  <div className="ml-4">city: "New York"</div>
                  <div>&#125;)</div>
                  <br />
                  <div className="text-gray-400">// Result:</div>
                  <div>&#123;</div>
                  <div className="ml-4">"acknowledged": true,</div>
                  <div className="ml-4">"insertedId": ObjectId("...")</div>
                  <div>&#125;</div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. insertMany() - Insert Multiple Documents</h3>
                <p className="text-gray-700 mb-3">Use insertMany() to insert multiple documents at once.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Insert multiple product documents</div>
                  <div>db.products.insertMany([</div>
                  <div className="ml-4">&#123; name: "Laptop", price: 999, category: "Electronics" &#125;,</div>
                  <div className="ml-4">&#123; name: "Mouse", price: 25, category: "Electronics" &#125;,</div>
                  <div className="ml-4">&#123; name: "Desk", price: 200, category: "Furniture" &#125;</div>
                  <div>])</div>
                </div>
              </div>

              {/* READ Operations */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">👀 READ Operations</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. find() - Query Documents</h3>
                <p className="text-gray-700 mb-3">Use find() to retrieve documents from a collection.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Find all documents</div>
                  <div>db.users.find()</div>
                  <br />
                  <div className="text-gray-400">// Find documents with specific criteria</div>
                  <div>db.users.find(&#123; age: &#123;$gte: 25&#125; &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Find with multiple conditions</div>
                  <div>db.users.find(&#123;</div>
                  <div className="ml-4">age: &#123;$gte: 18, $lte: 65&#125;,</div>
                  <div className="ml-4">city: "New York"</div>
                  <div>&#125;)</div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. findOne() - Get Single Document</h3>
                <p className="text-gray-700 mb-3">Use findOne() to retrieve the first document that matches the query.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Find first user with specific email</div>
                  <div>db.users.findOne(&#123; email: "john@example.com" &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Find by ObjectId</div>
                  <div>db.users.findOne(&#123; _id: ObjectId("...") &#125;)</div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-4">
                  <h4 className="font-bold text-blue-800 mb-2">🔍 Common Query Operators:</h4>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li><code>$eq</code> - Equal to</li>
                    <li><code>$ne</code> - Not equal to</li>
                    <li><code>$gt</code> - Greater than</li>
                    <li><code>$gte</code> - Greater than or equal</li>
                    <li><code>$lt</code> - Less than</li>
                    <li><code>$lte</code> - Less than or equal</li>
                    <li><code>$in</code> - Match any value in array</li>
                    <li><code>$nin</code> - Not in array</li>
                  </ul>
                </div>
              </div>

              {/* UPDATE Operations */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">✏️ UPDATE Operations</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. updateOne() - Update Single Document</h3>
                <p className="text-gray-700 mb-3">Use updateOne() to update the first document that matches the query.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Update user's age</div>
                  <div>db.users.updateOne(</div>
                  <div className="ml-4">&#123; email: "john@example.com" &#125;,  // Query</div>
                  <div className="ml-4">&#123; $set: &#123; age: 29 &#125; &#125;      // Update</div>
                  <div>)</div>
                  <br />
                  <div className="text-gray-400">// Add new field</div>
                  <div>db.users.updateOne(</div>
                  <div className="ml-4">&#123; _id: ObjectId("...") &#125;,</div>
                  <div className="ml-4">&#123; $set: &#123; status: "active" &#125; &#125;</div>
                  <div>)</div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. updateMany() - Update Multiple Documents</h3>
                <p className="text-gray-700 mb-3">Use updateMany() to update all documents that match the query.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Update all products in Electronics category</div>
                  <div>db.products.updateMany(</div>
                  <div className="ml-4">&#123; category: "Electronics" &#125;,</div>
                  <div className="ml-4">&#123; $set: &#123; inStock: true &#125; &#125;</div>
                  <div>)</div>
                  <br />
                  <div className="text-gray-400">// Increase prices by 10%</div>
                  <div>db.products.updateMany(</div>
                  <div className="ml-4">&#123;&#125;, // Empty query = all documents</div>
                  <div className="ml-4">&#123; $mul: &#123; price: 1.1 &#125; &#125;</div>
                  <div>)</div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-4">
                  <h4 className="font-bold text-yellow-800 mb-2">⚡ Common Update Operators:</h4>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li><code>$set</code> - Set field value</li>
                    <li><code>$unset</code> - Remove field</li>
                    <li><code>$inc</code> - Increment number value</li>
                    <li><code>$mul</code> - Multiply number value</li>
                    <li><code>$push</code> - Add element to array</li>
                    <li><code>$pull</code> - Remove element from array</li>
                    <li><code>$addToSet</code> - Add unique element to array</li>
                  </ul>
                </div>
              </div>

              {/* DELETE Operations */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">🗑️ DELETE Operations</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. deleteOne() - Delete Single Document</h3>
                <p className="text-gray-700 mb-3">Use deleteOne() to delete the first document that matches the query.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Delete user by email</div>
                  <div>db.users.deleteOne(&#123; email: "john@example.com" &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Delete by ObjectId</div>
                  <div>db.users.deleteOne(&#123; _id: ObjectId("...") &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Result:</div>
                  <div>&#123; "acknowledged": true, "deletedCount": 1 &#125;</div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. deleteMany() - Delete Multiple Documents</h3>
                <p className="text-gray-700 mb-3">Use deleteMany() to delete all documents that match the query.</p>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400">// Delete all inactive users</div>
                  <div>db.users.deleteMany(&#123; status: "inactive" &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Delete products with price less than 10</div>
                  <div>db.products.deleteMany(&#123; price: &#123;$lt: 10&#125; &#125;)</div>
                  <br />
                  <div className="text-gray-400">// Result:</div>
                  <div>&#123; "acknowledged": true, "deletedCount": 5 &#125;</div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mt-4">
                  <h4 className="font-bold text-red-800 mb-2">⚠️ Important Warning:</h4>
                  <p className="text-red-700 text-sm">
                    Be very careful with delete operations, especially deleteMany(). 
                    Always test your query with find() first to see what documents will be affected!
                  </p>
                </div>
              </div>

              {/* Best Practices */}
              <div className="mb-8">
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                  <h3 className="font-bold text-green-800 mb-4">✅ CRUD Best Practices</h3>
                  <ul className="text-green-700 space-y-2">
                    <li><strong>Always validate data</strong> before inserting or updating</li>
                    <li><strong>Use specific queries</strong> to avoid affecting unintended documents</li>
                    <li><strong>Test with find()</strong> before running update or delete operations</li>
                    <li><strong>Use indexes</strong> on frequently queried fields for better performance</li>
                    <li><strong>Consider atomic operations</strong> like findOneAndUpdate() for consistency</li>
                    <li><strong>Use projection</strong> to limit returned fields</li>
                    <li><strong>Handle errors</strong> properly in your application code</li>
                  </ul>
                </div>
              </div>

              {/* Ready for Quiz */}
              <div className="text-center">
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-3">🎯 Ready to Test Your Knowledge?</h3>
                  <p className="text-orange-700 mb-4">
                    You've learned about all four CRUD operations and their various methods. 
                    Time to put your knowledge to the test!
                  </p>
                  <button
                    onClick={startQuiz}
                    className="bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
                  >
                    Start CRUD Quiz 🚀
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <BearMascot size="100px" />
            <h2 className="text-3xl font-bold text-gray-800 mt-6 mb-4">Quiz Complete! 🎉</h2>
            
            <div className="text-6xl font-bold text-orange-600 mb-4">{score}%</div>
            
            <p className="text-gray-600 mb-6">
              You got {questions.filter((q) => selectedAnswers[q.id] === q.correct).length} out of {questions.length} questions correct!
            </p>
            
            {score >= 70 ? (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold">🎉 Excellent work! You've mastered CRUD operations!</p>
                <p className="text-green-700">You're ready to move on to the next module.</p>
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 font-semibold">📚 Good effort! Consider reviewing the material again.</p>
                <p className="text-yellow-700">Aim for 70% or higher to master this module.</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => setShowTheory(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Review Theory
              </button>
              <button
                onClick={onBackToPath}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BearMascot size="60px" />
              <div>
                <h1 className="text-2xl font-bold text-orange-800">CRUD Operations Quiz</h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
            </div>
            <button
              onClick={onBackToPath}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Exit Quiz
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswers[currentQ.id] === index
                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
          
          {/* Show explanation after answer is selected */}
          {selectedAnswers[currentQ.id] !== undefined && (
            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-blue-800">
                <strong>Explanation:</strong> {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finish Quiz 🎯
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module3;
