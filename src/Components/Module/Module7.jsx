import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Module7 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true); // Start with theory

  // Quiz questions based on MongoDB Aggregation Pipeline
  const questions = [
    {
      id: 1,
      question: "What is the MongoDB Aggregation Pipeline?",
      options: [
        "A way to store documents",
        "A framework for data processing and transformation",
        "A type of database index",
        "A backup mechanism"
      ],
      correct: 1,
      explanation: "The Aggregation Pipeline is a framework for data aggregation modeled on the concept of data processing pipelines where documents enter a multi-stage pipeline that transforms them into aggregated results."
    },
    {
      id: 2,
      question: "Which operator is used to filter documents in the aggregation pipeline?",
      options: [
        "$group",
        "$match",
        "$project",
        "$sort"
      ],
      correct: 1,
      explanation: "$match filters documents to pass only those that match the specified condition(s) to the next pipeline stage."
    },
    {
      id: 3,
      question: "What does the $group stage do in aggregation?",
      options: [
        "Sorts documents",
        "Filters documents",
        "Groups documents by specified fields and performs operations",
        "Limits the number of results"
      ],
      correct: 2,
      explanation: "$group groups input documents by a specified identifier expression and applies accumulator expressions to each group."
    },
    {
      id: 4,
      question: "Which operator calculates the sum of numeric values in $group?",
      options: [
        "$total",
        "$add",
        "$sum",
        "$count"
      ],
      correct: 2,
      explanation: "$sum calculates and returns the sum of numeric values, often used within $group stages for aggregation."
    },
    {
      id: 5,
      question: "What does $project do in the aggregation pipeline?",
      options: [
        "Creates new collections",
        "Reshapes documents by including, excluding, or adding fields",
        "Joins collections",
        "Indexes documents"
      ],
      correct: 1,
      explanation: "$project passes along documents with only the specified fields or with new computed fields to the next stage."
    },
    {
      id: 6,
      question: "Which stage would you use to sort aggregated results?",
      options: [
        "$order",
        "$sort",
        "$arrange",
        "$sequence"
      ],
      correct: 1,
      explanation: "$sort reorders the document stream by a specified sort key and direction (ascending or descending)."
    },
    {
      id: 7,
      question: "What is the purpose of $lookup in aggregation?",
      options: [
        "To look up indexes",
        "To perform left outer joins with another collection",
        "To search for documents",
        "To validate data"
      ],
      correct: 1,
      explanation: "$lookup performs a left outer join to another collection in the same database to filter in documents from the 'joined' collection for processing."
    }
  ];

  // Theory content
  const theoryContent = {
    title: "MongoDB Aggregation Pipeline",
    description: "Master advanced data processing and transformation techniques",
    sections: [
      {
        title: "1. Introduction to Aggregation Pipeline",
        content: [
          "The MongoDB Aggregation Pipeline is a powerful framework for data processing and analysis.",
          "It processes data through a sequence of stages, where each stage transforms the data.",
          "Similar to Unix pipelines, documents flow through stages and get transformed step by step.",
          "Each stage receives input documents, processes them, and passes results to the next stage.",
          "Aggregation is more powerful than simple find() queries for complex data analysis."
        ]
      },
      {
        title: "2. Pipeline Structure and Syntax",
        content: [
          "• Aggregation uses db.collection.aggregate([...stages]) syntax",
          "• Each stage is represented as a document with stage operators",
          "• Stages execute in order, with output of one stage becoming input of the next",
          "• Common stages: $match, $group, $project, $sort, $limit, $skip",
          "• Pipeline stages can be repeated and combined in various ways",
          "• Use array syntax: [{ $match: {...} }, { $group: {...} }, { $sort: {...} }]"
        ]
      },
      {
        title: "3. The $match Stage",
        content: [
          "• $match filters documents similar to find() queries",
          "• Should be placed early in pipeline for performance optimization",
          "• Reduces the number of documents passed to subsequent stages",
          "• Supports all query operators: $eq, $gt, $in, $regex, etc.",
          "• Example: { $match: { status: 'active', age: { $gte: 18 } } }",
          "• Can use indexes when placed at the beginning of pipeline"
        ]
      },
      {
        title: "4. The $group Stage",
        content: [
          "• $group groups documents by specified fields and performs calculations",
          "• Requires _id field to specify grouping criteria",
          "• Accumulator operators: $sum, $avg, $min, $max, $count",
          "• Example: { $group: { _id: '$category', total: { $sum: '$price' } } }",
          "• Use null for _id to group all documents together",
          "• $push and $addToSet collect values into arrays"
        ]
      },
      {
        title: "5. The $project Stage",
        content: [
          "• $project reshapes documents by including, excluding, or computing fields",
          "• Include fields: { $project: { name: 1, email: 1, _id: 0 } }",
          "• Exclude fields: { $project: { password: 0, internalNotes: 0 } }",
          "• Compute new fields: { $project: { fullName: { $concat: ['$firstName', ' ', '$lastName'] } } }",
          "• Rename fields: { $project: { customerName: '$name', total: '$amount' } }",
          "• Mathematical operations: $add, $subtract, $multiply, $divide"
        ]
      },
      {
        title: "6. Sorting and Limiting Results",
        content: [
          "• $sort orders documents: { $sort: { fieldName: 1 } } for ascending",
          "• Use -1 for descending order: { $sort: { score: -1, name: 1 } }",
          "• $limit restricts number of documents: { $limit: 10 }",
          "• $skip bypasses documents for pagination: { $skip: 20 }",
          "• Combine for pagination: [{ $skip: 20 }, { $limit: 10 }]",
          "• Sort before limit for consistent results"
        ]
      },
      {
        title: "7. Advanced Aggregation Operators",
        content: [
          "• $lookup performs joins with other collections",
          "• $unwind deconstructs arrays into separate documents",
          "• $sample randomly selects documents from collection",
          "• $bucket groups documents into buckets based on ranges",
          "• $facet performs multiple aggregation pipelines within single stage",
          "• $addFields adds new fields to documents without removing existing ones"
        ]
      },
      {
        title: "8. Working with Arrays and Objects",
        content: [
          "• $unwind creates separate documents for each array element",
          "• $push collects values into arrays during grouping",
          "• $addToSet creates arrays with unique values only",
          "• $arrayElemAt accesses array elements by index",
          "• $size returns array length",
          "• $filter selects array elements based on conditions"
        ]
      },
      {
        title: "9. Date and String Operations",
        content: [
          "• Date operators: $year, $month, $dayOfMonth, $hour, $minute",
          "• String operators: $concat, $substr, $toUpper, $toLower",
          "• $dateToString formats dates as strings",
          "• $regex performs pattern matching within aggregation",
          "• $split divides strings into arrays",
          "• $trim removes whitespace from strings"
        ]
      },
      {
        title: "10. Performance and Best Practices",
        content: [
          "• Place $match and $sort stages early for index utilization",
          "• Use $project to reduce document size early in pipeline",
          "• Avoid unnecessary stages that don't transform data",
          "• Use explain() to analyze aggregation performance",
          "• Consider allowDiskUse: true for large datasets",
          "• Create appropriate indexes for aggregation queries",
          "• Monitor memory usage and optimize accordingly"
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
    // Pass checkpoint ID (9 for Module7 - Aggregation Pipeline), score, and total questions
    onModuleComplete(9, score, questions.length);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-purple-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToPath}
                className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              >
                ← Back to Learning Path
              </button>
              
              <div className="flex items-center space-x-3">
                <BearMascot className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold text-purple-800">{theoryContent.title}</h1>
                  <p className="text-purple-600">{theoryContent.description}</p>
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
                            <span className="text-purple-600 mr-2 mt-1">•</span>
                            <span>{item.substring(1).trim()}</span>
                          </span>
                        ) : (
                          <span className="flex items-start">
                            <span className="text-purple-600 mr-2 mt-1">•</span>
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
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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
                      Excellent work! You've mastered MongoDB aggregation pipeline concepts. 
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
                  className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  🔄 Retake Quiz
                </button>
                
                {passed && (
                  <button
                    onClick={handleCompleteModule}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BearMascot className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold text-purple-800">MongoDB Aggregation Quiz</h1>
                <p className="text-purple-600 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
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
                      ? 'border-purple-500 bg-purple-50 text-purple-900'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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
                    : 'text-purple-600 hover:bg-purple-50'
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
                    : 'bg-purple-600 text-white hover:bg-purple-700'
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

export default Module7;
