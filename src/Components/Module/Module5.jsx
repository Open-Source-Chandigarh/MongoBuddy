import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module5 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true); // Start with theory

  // Quiz questions based on MongoDB Queries and Filters
  const questions = [
    {
      id: 1,
      question: "Which operator is used to find documents where a field is greater than a specific value?",
      options: [
        "$gt",
        "$gte",
        "$lt",
        "$eq"
      ],
      correct: 0,
      explanation: "$gt (greater than) operator is used to find documents where a field value is greater than the specified value."
    },
    {
      id: 2,
      question: "What does the $in operator do in MongoDB queries?",
      options: [
        "Checks if a field exists",
        "Matches any value in an array of values",
        "Performs text search",
        "Sorts results in ascending order"
      ],
      correct: 1,
      explanation: "The $in operator matches documents where the field value equals any value in the specified array."
    },
    {
      id: 3,
      question: "Which logical operator ensures ALL conditions must be true?",
      options: [
        "$or",
        "$nor",
        "$and",
        "$not"
      ],
      correct: 2,
      explanation: "$and operator ensures that all specified conditions must be true for a document to match."
    },
    {
      id: 4,
      question: "What does projection do in MongoDB queries?",
      options: [
        "Sorts the results",
        "Limits the number of results",
        "Controls which fields are returned",
        "Filters documents by field existence"
      ],
      correct: 2,
      explanation: "Projection controls which fields are included or excluded in the query results, reducing data transfer and improving performance."
    },
    {
      id: 5,
      question: "Which operator is used to query arrays for documents containing all specified values?",
      options: [
        "$elemMatch",
        "$all",
        "$size",
        "$push"
      ],
      correct: 1,
      explanation: "$all operator matches documents where an array field contains all the specified values."
    },
    {
      id: 6,
      question: "What is the purpose of the explain() method?",
      options: [
        "To format query results",
        "To analyze query performance",
        "To create indexes",
        "To sort results"
      ],
      correct: 1,
      explanation: "The explain() method provides detailed information about query execution, helping analyze performance and optimization opportunities."
    }
  ];

  // Theory content
  const theoryContent = {
    title: "MongoDB Queries and Filters",
    description: "Master advanced querying techniques and filtering in MongoDB",
    sections: [
      {
        title: "1. Basic Query Operations",
        content: [
          "MongoDB queries retrieve specific documents from collections based on criteria.",
          "The find() method is the primary way to query documents in MongoDB.",
          "You can specify filter conditions to get exactly the documents you need.",
          "Basic syntax: db.collection.find({ field: value })"
        ]
      },
      {
        title: "2. Comparison Operators",
        content: [
          "• $gt (greater than): { age: { $gt: 18 } }",
          "• $gte (greater than or equal): { score: { $gte: 90 } }",
          "• $lt (less than): { price: { $lt: 100 } }",
          "• $lte (less than or equal): { rating: { $lte: 5 } }",
          "• $ne (not equal): { status: { $ne: 'inactive' } }",
          "• $in (in array): { grade: { $in: ['A', 'B'] } }",
          "• $nin (not in array): { category: { $nin: ['spam', 'deleted'] } }"
        ]
      },
      {
        title: "3. Logical Operators",
        content: [
          "• $and: All conditions must be true - { $and: [{ age: { $gte: 18 } }, { status: 'active' }] }",
          "• $or: At least one condition must be true - { $or: [{ subject: 'Math' }, { subject: 'Physics' }] }",
          "• $not: Negates the specified condition - { score: { $not: { $lt: 60 } } }",
          "• $nor: None of the conditions should be true - { $nor: [{ expired: true }, { banned: true }] }",
          "These operators allow you to create complex query logic by combining multiple conditions."
        ]
      },
      {
        title: "4. Field Existence and Type Queries",
        content: [
          "• $exists: Check if a field exists - { email: { $exists: true } }",
          "• $type: Filter by BSON data type - { name: { $type: 'string' } }",
          "Common BSON types: 'string', 'number', 'array', 'object', 'bool', 'date'",
          "Useful for data validation and cleanup operations.",
          "Example: Find documents with missing fields - { phoneNumber: { $exists: false } }"
        ]
      },
      {
        title: "5. Array Queries",
        content: [
          "• $all: Array must contain all specified values - { subjects: { $all: ['Math', 'Physics'] } }",
          "• $elemMatch: Array elements match multiple conditions - { grades: { $elemMatch: { subject: 'Math', score: { $gte: 90 } } } }",
          "• $size: Query by array length - { tags: { $size: 3 } }",
          "• Array element by position: { 'grades.0.score': { $gt: 85 } }",
          "MongoDB provides powerful capabilities for querying array fields effectively."
        ]
      },
      {
        title: "6. Text and Pattern Matching",
        content: [
          "• $regex: Pattern matching - { name: { $regex: '^John', $options: 'i' } }",
          "• $text: Full-text search (requires text index) - { $text: { $search: 'mongodb database' } }",
          "• Case-insensitive searches using 'i' option",
          "• Word boundary matching: { description: { $regex: '\\\\bmongodb\\\\b', $options: 'i' } }",
          "Regular expressions provide powerful string matching capabilities."
        ]
      },
      {
        title: "7. Projection and Field Selection",
        content: [
          "• Include specific fields: db.collection.find({}, { name: 1, email: 1 })",
          "• Exclude specific fields: db.collection.find({}, { password: 0, internalNotes: 0 })",
          "• Exclude _id field: { name: 1, score: 1, _id: 0 }",
          "• Array projection: { 'grades.$': 1 } - returns only matching array element",
          "• Slice arrays: { grades: { $slice: 2 } } - limits array elements returned"
        ]
      },
      {
        title: "8. Sorting and Limiting",
        content: [
          "• Sort ascending: .sort({ name: 1 })",
          "• Sort descending: .sort({ score: -1 })",
          "• Multiple field sorting: .sort({ grade: 1, score: -1 })",
          "• Limit results: .limit(10)",
          "• Skip results for pagination: .skip(20).limit(10)",
          "• Combined: .find().sort({ date: -1 }).skip(10).limit(5)"
        ]
      },
      {
        title: "9. Query Performance",
        content: [
          "• Use explain() to analyze query performance: .find().explain('executionStats')",
          "• Create indexes for frequently queried fields: db.collection.createIndex({ email: 1 })",
          "• Compound indexes for multi-field queries: db.collection.createIndex({ status: 1, date: -1 })",
          "• Text indexes for full-text search: db.collection.createIndex({ title: 'text', content: 'text' })",
          "• Monitor execution time and documents examined for optimization opportunities"
        ]
      },
      {
        title: "10. Best Practices",
        content: [
          "• Index frequently queried fields to improve performance",
          "• Use projection to limit returned data and reduce network traffic",
         
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

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCompleteModule = () => {
    onModuleComplete('module5', score);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQuestionData = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = selectedAnswers[currentQuestionData?.id] !== undefined;

  if (showTheory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToPath}
                className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              >
                ← Back to Learning Path
              </button>
              
              <div className="flex items-center space-x-3">
                <BearMascot className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold text-green-800">{theoryContent.title}</h1>
                  <p className="text-green-600">{theoryContent.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-6">
              {theoryContent.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 leading-relaxed">
                        {item.startsWith('•') ? (
                          <span className="flex items-start">
                            <span className="text-green-600 mr-2 mt-1">•</span>
                            <span>{item.substring(1).trim()}</span>
                          </span>
                        ) : (
                          <span className="flex items-start">
                            <span className="text-green-600 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Start Quiz Button */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                >
                  🎯 Start Quiz ({questions.length} questions)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-8 py-12 text-center">
              <div className="mb-8">
                <BearMascot size="120px" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {passed ? "🎉 Congratulations!" : "📚 Keep Learning!"}
              </h2>
              
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2" style={{ color: passed ? '#10B981' : '#F59E0B' }}>
                  {percentage}%
                </div>
                <p className="text-gray-600">
                  You scored {score} out of {questions.length} questions correctly
                </p>
              </div>

              <div className="mb-8">
                {passed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      Excellent work! You've mastered MongoDB queries and filters. 
                      You're ready to move on to the next module!
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      You need 70% or higher to pass. Review the material and try again!
                    </p>
                  </div>
                )}
              </div>

              {/* Detailed Results Section */}
              <div className="mb-8 text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">📋 Quiz Review</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {questions.map((question, index) => {
                    const userAnswer = selectedAnswers[question.id];
                    const isCorrect = userAnswer === question.correct;
                    return (
                      <div key={question.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                          <span className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? '✅ Correct' : '❌ Wrong'}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{question.question}</p>
                        
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = userAnswer === optionIndex;
                            const isCorrectAnswer = question.correct === optionIndex;
                            
                            let optionStyle = 'p-2 rounded text-sm ';
                            if (isCorrectAnswer) {
                              optionStyle += 'bg-green-100 border border-green-300 text-green-800 font-medium';
                            } else if (isUserAnswer && !isCorrectAnswer) {
                              optionStyle += 'bg-red-100 border border-red-300 text-red-800';
                            } else {
                              optionStyle += 'bg-gray-100 border border-gray-200 text-gray-600';
                            }
                            
                            return (
                              <div key={optionIndex} className={optionStyle}>
                                <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                                {isCorrectAnswer && <span className="ml-2 text-green-600">← Correct Answer</span>}
                                {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600">← Your Answer</span>}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  🔄 Retake Quiz
                </button>
                
                {passed && (
                  <button
                    onClick={handleCompleteModule}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    ✅ Complete Module
                  </button>
                )}
                
                <button
                  onClick={onBackToPath}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  🏠 Back to Learning Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BearMascot className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold text-green-800">MongoDB Queries Quiz</h1>
                <p className="text-green-600 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentQuestionData.question}
            </h2>
            
            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestionData.id] === index
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentQuestion === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-green-600 hover:bg-green-50'
                }`}
              >
                ← Previous
              </button>
              
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </span>
              
              <button
                onClick={handleNextQuestion}
                disabled={!hasAnswered}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !hasAnswered
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isLastQuestion ? 'Submit Quiz' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module5;
