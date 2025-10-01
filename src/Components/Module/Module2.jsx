import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module2 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true); // Start with theory

  // Quiz questions based on MongoDB Module 2 content - Documents & Collections
  const questions = [
    {
      id: 1,
      question: "What is a document in MongoDB?",
      options: [
        "A row in a table",
        "A JSON-like data structure with key-value pairs",
        "A database schema",
        "A collection of tables"
      ],
      correct: 1,
      explanation: "A document in MongoDB is a JSON-like data structure composed of key-value pairs, similar to objects in programming languages."
    },
    {
      id: 2,
      question: "What format does MongoDB use to store documents internally?",
      options: [
        "JSON",
        "XML",
        "BSON (Binary JSON)",
        "CSV"
      ],
      correct: 2,
      explanation: "MongoDB stores documents in BSON (Binary JSON) format, which extends JSON with additional data types like dates, ObjectId, and binary data."
    },
    {
      id: 3,
      question: "What is a collection in MongoDB?",
      options: [
        "A single document",
        "A group of related documents",
        "A database connection",
        "A query result"
      ],
      correct: 1,
      explanation: "A collection is a group of related documents stored together, similar to a table in relational databases but without a fixed schema."
    },
    {
      id: 4,
      question: "Which field is automatically added to every MongoDB document?",
      options: [
        "id",
        "_id",
        "objectId",
        "primaryKey"
      ],
      correct: 1,
      explanation: "MongoDB automatically adds an '_id' field to every document, which serves as the primary key and must be unique within the collection."
    },
    {
      id: 5,
      question: "Can documents in the same collection have different structures?",
      options: [
        "No, all documents must have identical fields",
        "Yes, documents can have different fields and structures",
        "Only if you define a schema first",
        "Only for the first 100 documents"
      ],
      correct: 1,
      explanation: "MongoDB collections are schema-flexible, meaning documents in the same collection can have different fields and structures."
    },
    {
      id: 6,
      question: "What is the maximum size limit for a single MongoDB document?",
      options: [
        "1 MB",
        "16 MB",
        "32 MB",
        "No limit"
      ],
      correct: 1,
      explanation: "The maximum size for a single BSON document in MongoDB is 16 MB, which helps ensure reasonable performance."
    }
  ];

  // Theory content for Module 2 - Documents & Collections
  const theoryContent = {
    title: "Documents & Collections",
    sections: [
      {
        title: "1. What are Documents?",
        content: [
          "Documents are the basic unit of data in MongoDB, similar to rows in relational databases.",
          "A document is a JSON-like data structure composed of key-value pairs called fields.",
          "Documents are stored in BSON (Binary JSON) format, which extends JSON with additional data types.",
          "Each document can contain different data types: strings, numbers, arrays, nested objects, dates, and more."
        ]
      },
      {
        title: "2. Document Structure",
        content: [
          "Documents use a flexible schema - no two documents need to have the same structure.",
          "Documents can contain nested documents (subdocuments) and arrays.",

        ]
      },
      {
        title: "3. The _id Field",
        content: [
          "Every MongoDB document has a unique '_id' field that acts as the primary key.",
          "If you don't specify an '_id', MongoDB automatically generates an ObjectId.",
          "The '_id' field is immutable and must be unique within the collection.",
          "ObjectId is a 12-byte identifier consisting of timestamp, machine id, process id, and counter."
        ]
      },
      {
        title: "4. What are Collections?",
        content: [
          "A collection is a group of related documents, similar to a table in relational databases.",
          "Collections don't enforce a schema - documents can have different structures.",
          "Collection names are strings and have certain naming restrictions.",
          "Collections are created automatically when you first store data in them."
        ]
      },
      
      {
        title: "5. Collection Features",
        content: [
          "• Schema Flexibility: Documents in a collection can have different fields",
          "• Dynamic Creation: Collections are created automatically when needed",
          "• Indexing: Collections support various types of indexes for performance",
          "• Validation: Optional schema validation can be applied to collections",
          "• Capped Collections: Fixed-size collections that maintain insertion order"
        ]
      },
      {
        title: "6. Document vs Collection Relationship",
        content: [
          "Collections contain multiple documents, like folders containing files.",
          "Each document in a collection has a unique '_id' field.",
          "Documents in the same collection are typically related but can vary in structure.",
          "You can have multiple collections in a single database for different data types."
        ]
      }
    ]
  };

  const handleStartQuiz = () => {
    setShowTheory(false);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're ready for the next module! 🎉";
    if (percentage >= 60) return "Good job! Review the concepts and try again. 👍";
    return "Keep learning! Review the material and try again. 📚";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handleComplete = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      // Pass checkpoint ID (1 for Module2), score, and total questions
      onModuleComplete(1, score, questions.length);
    } else {
      // Still go back to path even if not passed
      onBackToPath();
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  // Results view
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <BearMascot size="120px" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Module 2 Complete! 🎯
            </h1>
            <p className="text-xl text-gray-600">Documents & Collections</p>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className={`text-2xl font-semibold mb-4 ${getScoreColor()}`}>
                {Math.round((score / questions.length) * 100)}%
              </div>
              <p className="text-lg text-gray-700">{getScoreMessage()}</p>
            </div>

            {/* Question Review */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Your Answers</h3>
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correct;
                
                return (
                  <div key={question.id} className={`p-6 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Question {index + 1}: {question.question}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Your answer: {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mb-2">
                            Correct answer: {question.options[question.correct]}
                          </p>
                        )}
                        <p className="text-sm text-gray-700 italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                  setShowResults(false);
                  setScore(0);
                  setShowTheory(true); // Go back to theory
                }}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📚 Review Theory & Retake
              </button>
              <button
                onClick={handleComplete}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  (score / questions.length) * 100 >= 80
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {(score / questions.length) * 100 >= 80 ? '🚀 Continue to Next Module' : '📚 Back to Learning Path'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Theory view
  if (showTheory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BearMascot size="80px" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Module 2: {theoryContent.title}
            </h1>
            <p className="text-gray-600">
              Learn about MongoDB's data structure fundamentals
            </p>
          </div>

          {/* Theory Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-8">
              {theoryContent.sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Show "Did you know?" card after Document Structure section */}
                  {index === 1 && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <BearMascot size="60px" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
                            <span className="text-2xl mr-2">💡</span>
                            Did you know?
                          </h3>
                          <p className="text-yellow-700 font-medium">
                            The maximum BSON document size is 16 mebibytes.
                          </p>
                          <p className="text-sm text-yellow-600 mt-2">
                            This limit helps ensure reasonable performance and prevents excessive memory usage. 
                            A mebibyte (MiB) is 1,048,576 bytes, slightly larger than a megabyte (MB).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show document example after "Did you know?" card */}
                  {index === 1 && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        📄 Example Document Structure
                      </h3>
                      <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "_id": ObjectId("64f8a1b2c3d4e5f678901234"),
  "title": "MongoDB Basics",
  "author": "John Doe",
  "tags": ["database", "nosql", "mongodb"],
  "content": {
    "introduction": "Welcome to MongoDB",
    "sections": ["Documents", "Collections"]
  },
  "published": true,
  "publishDate": ISODate("2023-09-01"),
  "views": 1250,
  "comments": [
    {
      "user": "Alice",
      "text": "Great tutorial!",
      "date": ISODate("2023-09-02")
    }
  ]
}`}
                      </pre>
                      <p className="text-sm text-gray-600 mt-3">
                        This document shows flexible structure with different data types: strings, numbers, arrays, nested objects, dates, and ObjectId.
                      </p>
                    </div>
                  )}

                  {/* Show Note card after _id Field section */}
                  {index === 2 && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <BearMascot size="60px" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
                            <span className="text-2xl mr-2">⚠️</span>
                            Note
                          </h3>
                          <p className="text-red-700 font-medium mb-3">
                            Each field name must be unique within the document. It should not be as shown below:
                          </p>
                          <div className="bg-red-100 p-4 rounded-lg">
                            <pre className="bg-gray-800 text-red-400 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "user_id": 101,
  "name": "Misha",
  "name": "Diya",     // ❌ Duplicate field name
  "email": "misha@example.com",
  "skills": ["C++", "React", "MongoDB"]
}`}
                            </pre>
                            <p className="text-sm text-red-600 mt-2">
                              ⚠️ This document is invalid because the "name" field appears twice. MongoDB will only store the last value ("Diya").
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Show collection example after collection theory sections */}
                  {(index === 3 || index === 4) && index === 4 && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        🗂️ Collection Structure Example
                      </h3>
                      <pre className="bg-gray-800 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
{`// Collection: "articles"
// Different document structures in same collection:

Document 1: {
  "_id": ObjectId("64f8a1b2c3d4e5f678901234"),
  "title": "MongoDB Tutorial",
  "type": "tutorial",
  "difficulty": "beginner"
}

Document 2: {
  "_id": ObjectId("64f8a1b2c3d4e5f678901235"),
  "title": "Breaking News",
  "type": "news",
  "urgent": true,
  "publishTime": ISODate("2023-09-01")
}

Document 3: {
  "_id": ObjectId("64f8a1b2c3d4e5f678901236"),
  "title": "Product Review",
  "type": "review",
  "rating": 5,
  "pros": ["fast", "reliable"],
  "cons": ["expensive"]
}`}
                      </pre>
                      <p className="text-sm text-gray-600 mt-3">
                        Notice how documents in the same collection can have completely different fields and structures - this is MongoDB's schema flexibility.
                      </p>
                    </div>
                  )}
                  
                  {/* Show comparison table after the last section (Document vs Collection Relationship) */}
                  {index === 5 && (
                    <div className="mt-6 p-6 bg-blue-50 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        📊 Documents vs Collections Comparison
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                          <thead className="bg-blue-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Aspect</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Document</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Collection</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">Definition</td>
                              <td className="px-6 py-4 text-sm text-gray-700">Single record with key-value pairs</td>
                              <td className="px-6 py-4 text-sm text-gray-700">Group of related documents</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">SQL Equivalent</td>
                              <td className="px-6 py-4 text-sm text-gray-700">Row</td>
                              <td className="px-6 py-4 text-sm text-gray-700">Table</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">Structure</td>
                              <td className="px-6 py-4 text-sm text-gray-700">Flexible, JSON-like</td>
                              <td className="px-6 py-4 text-sm text-gray-700">No fixed schema</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">Size Limit</td>
                              <td className="px-6 py-4 text-sm text-gray-700">16 MiB maximum</td>
                              <td className="px-6 py-4 text-sm text-gray-700">No limit</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">
                        This table summarizes the key differences between documents and collections in MongoDB.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Start Quiz Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleStartQuiz}
                className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                🚀 Start Quiz
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Test your understanding of documents and collections
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <button
              onClick={onBackToPath}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Back to Learning Path
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BearMascot size="80px" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Module 2 Quiz: Documents & Collections
          </h1>
          <p className="text-gray-600 mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          
          {/* Review Theory Button */}
          <button
            onClick={() => setShowTheory(true)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            📚 Review Theory
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQ.id] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQ.id] === index && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBackToPath}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Learning Path
          </button>

          <div className="flex space-x-4">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevQuestion}
                className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`py-2 px-6 rounded-lg font-medium transition-colors ${
                isAnswered
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module2;
