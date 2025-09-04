import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module1 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true); // Start with theory

  // Quiz questions based on MongoDB Module 1 content
  const questions = [
    {
      id: 1,
      question: "What does MongoDB store data as?",
      options: [
        "Tables and rows",
        "Documents in collections",
        "Key-value pairs",
        "XML files"
      ],
      correct: 1,
      explanation: "MongoDB stores data as documents (similar to JSON objects) organized in collections."
    },
    {
      id: 2,
      question: "What format does MongoDB use for documents?",
      options: [
        "XML",
        "CSV",
        "BSON (Binary JSON)",
        "Plain text"
      ],
      correct: 2,
      explanation: "MongoDB uses BSON (Binary JSON) format for storing documents, which extends JSON with additional data types."
    },
    {
      id: 3,
      question: "Which of the following is a key advantage of MongoDB?",
      options: [
        "Requires fixed schema",
        "Flexible schema design",
        "Only supports SQL queries",
        "Limited scalability"
      ],
      correct: 1,
      explanation: "MongoDB's flexible schema allows you to add fields to documents without modifying the entire collection structure."
    },
    {
      id: 4,
      question: "What is a collection in MongoDB?",
      options: [
        "A single document",
        "A group of related documents",
        "A database connection",
        "A query result"
      ],
      correct: 1,
      explanation: "A collection in MongoDB is a group of related documents, similar to a table in relational databases."
    },
    {
      id: 5,
      question: "Which query language does MongoDB primarily use?",
      options: [
        "SQL",
        "MongoDB Query Language (MQL)",
        "GraphQL",
        "XQuery"
      ],
      correct: 1,
      explanation: "MongoDB uses its own MongoDB Query Language (MQL) which is based on JavaScript and JSON-like syntax."
    }
  ];

  // Theory content for Module 1
  const theoryContent = {
    title: "MongoDB Fundamentals",
    sections: [
      {
        title: "1. What is SQL?",
        content: [
          "SQL (Structured Query Language) databases are relational → meaning data is stored in tables (rows & columns).",
          "Each table has a fixed structure with predefined columns and data types.",
          "Data is organized in rows (records) and columns (fields), similar to a spreadsheet."
        ],
        hasTable: true,
        tableData: {
          title: "Example: Students Table (SQL Database)",
          headers: ["Name", "Roll Number", "Marks"],
          rows: [
            ["Ajay", "101", "92"],
            ["Jiya", "102", "90"],
            ["Rahul", "103", "88"],
            ["Priya", "104", "95"]
          ]
        }
      },
      {
        title: "2.What is NoSQL?",
        content: [
          "NoSQL (can say “Not only SQL”) is non relational.",
          "It is flexible,schema less and semi structured. Data can be stored as documents and key value pairs.",
        " This is a document shown below which consists of key value pairs."]
      },
      {
        title: "3. Collections and Databases",
        content: [
          "A collection is a group of related documents, similar to a table in relational databases.",
          "A database contains multiple collections and serves as a container for storing related data.",
          "Unlike SQL databases, you don't need to create collections in advance - MongoDB creates them automatically when you insert documents."
        ]
      },
      {
        title: "4. Key Advantages of MongoDB",
        content: [
          "• Flexible Schema: No need to define a fixed structure beforehand",
          "• Horizontal Scalability: Easy to scale across multiple servers",
          "• Rich Query Language: Powerful querying capabilities with MongoDB Query Language (MQL)",
          "• High Performance: Optimized for read and write operations",
          "• Developer Friendly: Works naturally with modern programming languages"
        ]
      },
      {
        title: "5. MongoDB vs Traditional Databases",
        content: [
          "Traditional SQL databases use structured tables with predefined schemas, while MongoDB uses flexible documents.",
          "SQL databases use SQL (Structured Query Language), while MongoDB uses MQL (MongoDB Query Language).",
          "MongoDB is better suited for applications with evolving requirements and complex data structures.",
          "SQL databases are ideal for applications requiring ACID transactions and complex relationships."
        ]
      },
      {
        title: "6. When to Use MongoDB",
        content: [
          "• Rapid application development with changing requirements",
          "• Applications dealing with large volumes of structured and semi-structured data",
          "• Real-time analytics and big data applications",
          "• Content management systems and catalogs",
          "• Internet of Things (IoT) applications",
          "• Mobile and social media applications"
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
      onModuleComplete(1, score); // Module 1 completed with score
    }
    onBackToPath();
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <BearMascot size="120px" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Module 1 Complete! 🎯
            </h1>
            <p className="text-xl text-gray-600">MongoDB Fundamentals</p>
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
                � Review Theory & Retake
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <BearMascot size="80px" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Module 1: {theoryContent.title}
            </h1>
            <p className="text-gray-600">
              Learn the fundamentals before taking the quiz
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
                  
                  {/* Render table if section has table data */}
                  {section.hasTable && section.tableData && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {section.tableData.title}
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                          <thead className="bg-blue-50">
                            <tr>
                              {section.tableData.headers.map((header, hIndex) => (
                                <th 
                                  key={hIndex}
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-300"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {section.tableData.rows.map((row, rIndex) => (
                              <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {row.map((cell, cIndex) => (
                                  <td 
                                    key={cIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This is how data looks in a traditional SQL database - structured in rows and columns.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* SQL vs MongoDB Comparison */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📄 Same Data in MongoDB (Document Format)
              </h3>
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`// Student documents in MongoDB
[
  {
    "_id": ObjectId("64f8a1b2c3d4e5f678901234"),
    "name": "Ajay",
    "rollNumber": 101,
    "marks": 92,
    "subjects": ["Math", "Science", "English"],
    "address": {
      "city": "Mumbai",
      "state": "Maharashtra"
    },
    "isActive": true
  },
  {
    "_id": ObjectId("64f8a1b2c3d4e5f678901235"),
    "name": "Jiya", 
    "rollNumber": 102,
    "marks": 90,
    "subjects": ["Math", "Physics", "Chemistry"],
    "address": {
      "city": "Delhi",
      "state": "Delhi"
    },
    "isActive": true,
    "scholarshipHolder": true
  }
]`}
              </pre>
              <p className="text-sm text-gray-600 mt-3">
                Notice how MongoDB documents can have different fields (like "scholarshipHolder") and nested objects, providing much more flexibility than SQL tables.
              </p>
            </div>

            {/* Start Quiz Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleStartQuiz}
                className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                🚀 Start Quiz
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Make sure you understand the concepts above before proceeding
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BearMascot size="80px" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Module 1 Quiz: MongoDB Fundamentals
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
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
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
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQ.id] === index
                      ? 'border-green-500 bg-green-500'
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
                  ? 'bg-green-600 text-white hover:bg-green-700'
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

export default Module1;
