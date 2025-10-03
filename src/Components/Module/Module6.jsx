import React, { useState, useEffect } from 'react';
import BearMascot from '../BearMascot';
import { Calculator } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SupabaseProgressService from '../../services/supabaseProgressService';

const Module6 = ({ onBackToPath, onModuleComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true); // Start with theory


  // Quiz questions based on MongoDB Indexing
  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of database indexes in MongoDB?",
      options: [
        "To store backup data",
        "To improve query performance",
        "To compress data",
        "To encrypt documents"
      ],
      correct: 1,
      explanation: "Indexes are data structures that improve the speed of data retrieval operations by creating shortcuts to find documents quickly."
    },
    {
      id: 2,
      question: "Which command creates a single field index in MongoDB?",
      options: [
        "db.collection.createIndex({ field: 1 })",
        "db.collection.addIndex({ field: 1 })",
        "db.collection.newIndex({ field: 1 })",
        "db.collection.makeIndex({ field: 1 })"
      ],
      correct: 0,
      explanation: "The createIndex() method is used to create indexes in MongoDB. The value 1 indicates ascending order."
    },
    {
      id: 3,
      question: "What does a compound index in MongoDB contain?",
      options: [
        "Multiple collections",
        "Multiple databases",
        "Multiple fields from the same collection",
        "Multiple data types"
      ],
      correct: 2,
      explanation: "A compound index includes multiple fields from the same collection and can optimize queries that filter on multiple fields."
    },
    {
      id: 4,
      question: "Which index type is best for full-text search in MongoDB?",
      options: [
        "Single field index",
        "Compound index",
        "Text index",
        "Sparse index"
      ],
      correct: 2,
      explanation: "Text indexes are specifically designed for full-text search operations, allowing you to search for words and phrases within string content."
    },
    {
      id: 5,
      question: "What happens to query performance without proper indexing?",
      options: [
        "Queries run faster",
        "MongoDB performs collection scans",
        "Data gets corrupted",
        "Indexes are created automatically"
      ],
      correct: 1,
      explanation: "Without indexes, MongoDB must perform collection scans, examining every document to find matches, which is slow for large collections."
    },
    {
      id: 6,
      question: "Which method shows the execution plan of a query?",
      options: [
        "analyze()",
        "performance()",
        "explain()",
        "debug()"
      ],
      correct: 2,
      explanation: "The explain() method provides detailed information about how MongoDB executes a query, including which indexes are used."
    },
    {
      id: 7,
      question: "What is the trade-off of having too many indexes?",
      options: [
        "Faster queries but slower writes",
        "Slower queries but faster writes", 
        "No trade-offs exist",
        "Indexes don't affect performance"
      ],
      correct: 0,
      explanation: "While indexes speed up read operations, they slow down write operations because MongoDB must update the indexes whenever documents are inserted, updated, or deleted."
    },
    {
      id: 8,
      question: "Which index order should you use for sorting in descending order?",
      options: [
        "{ field: 1 }",
        "{ field: -1 }",
        "{ field: 0 }",
        "{ field: 'desc' }"
      ],
      correct: 1,
      explanation: "In MongoDB, -1 indicates descending order for indexes, while 1 indicates ascending order."
    }
  ];

  // Theory content
  const theoryContent = {
    title: "MongoDB Indexing",
    description: "Master database indexing for optimal query performance",
    sections: [
      {
        title: "1. Introduction to Database Indexing",
        content: [
          "Database indexes are data structures that improve the speed of data retrieval operations.",
          "Indexes create shortcuts to find documents quickly without scanning entire collections.",
          "They work similarly to book indexes, pointing to specific locations of data.",
          "Without an index → You have to read the entire book page by page to find something (full collection scan)",
          "With an index → You flip to the table of contents or the index at the back, and jump straight to the right page (indexed search).",
          "MongoDB automatically creates an index on the _id field for every collection.",
          "Proper indexing is crucial for application performance as data grows."
        ]
      },
      {
        title: "2. How Indexes Work",
        content: [
          "• Indexes store references to document locations sorted by field values",
          "• MongoDB can quickly locate documents using binary search on sorted indexes",
          "• Without indexes, MongoDB performs collection scans (examines every document)",
          "• Collection scans become exponentially slower as data volume increases",
          "• Indexes transform O(n) operations into O(log n) for better performance",
          "• The query optimizer automatically chooses the best index for each query"
        ]
      },
      {
        title: "3. Single Field Indexes",
        content: [
          "• Single field indexes are the most basic type of index in MongoDB",
          "• Created on individual fields: db.collection.createIndex({ fieldName: 1 })",
          "• Ascending order (1) vs descending order (-1) affects sort performance",
          "• Ideal for queries that filter or sort on a single field",
          "• Example: db.users.createIndex({ email: 1 }) for email lookups",
          "• Can dramatically improve performance for equality and range queries"
        ]
      },
      {
        title: "4. Compound Indexes",
        content: [
          "• Compound indexes include multiple fields from the same collection",
          "• Created with: db.collection.createIndex({ field1: 1, field2: -1, field3: 1 })",
          "• Field order matters significantly for query optimization",
          "• Follow the ESR rule: Equality, Sort, Range for optimal field ordering",
          "• Can support queries on any prefix of the indexed fields",
          "• Example: Index on {status: 1, date: -1} supports queries on status or status+date"
        ],
           code:`// Example collection Students
 [
  { name: "Aman", age: 21, grade: "A" },
  { name: "Aman", age: 19, grade: "B" },
  { name: "Bina", age: 20, grade: "A" },
  { name: "Chirag", age: 21, grade: "C" },
  { name: "Chirag", age: 22, grade: "B" }
]
  //Single Field Index
  db.students.createIndex({name:1}) //1 means ascending order -1 means descending

  //Compound Index
  db.students.createIndex({name:1,age:-1})
`
       
      },
      {
        title: "5. Index Types and Specializations",
        content: [
          "• Text Indexes: For full-text search with db.collection.createIndex({ title: 'text' })",   
          "• Sparse Indexes: Only index documents that contain the indexed field",
          "• Partial Indexes: Index only documents that meet specified criteria",
          "• Unique Indexes: Ensure field values are unique across the collection"
        ],
           code:`
// Example Collection Articles 
db.articles.insertMany([
  { title: "Introduction to MongoDB", body: "MongoDB is a NoSQL database that stores data in JSON-like documents.",author:"Alice" },
  { title: "Learning Python", body: "Python is a versatile language used in AI, web development, and data science." },
  { title: "AI with MongoDB", body: "MongoDB can be used to store and process AI datasets efficiently.",author:"Bob" },
  { title: "Machine Learning Basics", body: "Machine learning is a subset of AI with algorithms for prediction and classification." }
])
  // Text Index
  db.articles.createIndex({ title: "text", body: "text" })  //Mongo DB indexes all the words inside text and body for fast searches 

  //find 
  db.articles.find({ $text: { $search: "MongoDB" } })

  //Output: Returns docs where either the title or body contains “MongoDB”.
  //"Introduction to MongoDB"
  //"AI with MongoDB"


  //Sparse Index
  db.articles.createIndex({ author: 1 }, { sparse: true }) 

  //Output: Returns only those docs where the specified field is present

  // Partial Index  
  db.articles.createIndex(
  { author: 1 },
  { partialFilterExpression: { author: { $exists: true, $ne: "Guest" } } }

  //Unique index
  db.articles.createIndex({ author: 1 }, { unique: true })
)
`



      },
     
      {
        title: "6. Index Creation Strategies",
        content: [
          "• Analyze query patterns before creating indexes",
          "• Create indexes for frequently executed queries first",
          "• Use compound indexes for multi-field queries",
          "• Background index creation (background: true) prevents blocking operations",
          "• Test index effectiveness with explain() before and after creation"
        ]
      },
      {
        title: "7. Index Maintenance and Management",
        content: [
          "• View existing indexes: db.collection.getIndexes()",
          "• Drop unused indexes: db.collection.dropIndex('indexName')",
         "• Index size affects memory usage - monitor with db.collection.totalIndexSize()",
          "• Regular maintenance prevents index bloat and maintains performance"
        ]
      },
      {
        title: "8. Index Limitations and Trade-offs",
        content: [
          "• Indexes consume additional storage space and memory",
          "• Write operations (insert, update, delete) become slower with more indexes",
          "• Maximum 64 indexes per collection in MongoDB",
          "• Compound indexes limited to 32 fields maximum",
          "• Index key size cannot exceed 1024 bytes",
          "• Balance between read performance and write overhead"
        ]
      },
      {
        title: "10. Best Practices and Optimization",
        content: [
          "• Create indexes based on actual query patterns, not assumptions",
          "• Use the ESR (Equality, Sort, Range) rule for compound index field ordering",
          "• Avoid over-indexing - only create indexes that provide significant value",
          "• Monitor and remove unused indexes to improve write performance",
          "• Consider partial indexes for queries with consistent filter conditions",
          "• Plan index strategy during application design phase"
        ],
      
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
    // Pass checkpoint ID (8 for Module6 - Indexing), score, and total questions
    onModuleComplete(8, score, questions.length);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToPath}
                className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                ← Back to Learning Path
              </button>
              
              <div className="flex items-center space-x-3">
                <BearMascot className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold text-blue-800">{theoryContent.title}</h1>
                  <p className="text-blue-600">{theoryContent.description}</p>
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
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span>{item.substring(1).trim()}</span>
                          </span>
                        ) : (
                          <span className="flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Display code block if it exists */}
                  {section.code && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3"> Example:</h4>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm leading-relaxed">
                          <code>{section.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Start Quiz Button */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
                      Excellent work! You've mastered MongoDB indexing concepts. 
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
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  🔄 Retake Quiz
                </button>
                
                {passed && (
                  <button
                    onClick={handleCompleteModule}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BearMascot className="w-8 h-8" />
              <div>
                <h1 className="text-xl font-bold text-blue-800">MongoDB Indexing Quiz</h1>
                <p className="text-blue-600 text-sm">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                    : 'text-blue-600 hover:bg-blue-50'
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
                    : 'bg-blue-600 text-white hover:bg-blue-700'
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

export default Module6;
