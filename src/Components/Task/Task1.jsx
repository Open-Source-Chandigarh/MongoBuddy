import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Task1 = ({ onBackToPath, onTaskComplete }) => {
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample table data for the student to convert to MongoDB document
  const tableData = {
    title: "Student Information Table",
    headers: ["Student ID", "Name", "Age", "Email", "Course", "Year", "GPA"],
    rows: [
      ["ST001", "Alice Johnson", "20", "alice@university.edu", "Computer Science", "3", "3.8"],
      ["ST002", "Bob Smith", "19", "bob@university.edu", "Mathematics", "2", "3.5"],
      ["ST003", "Carol Wilson", "21", "carol@university.edu", "Physics", "4", "3.9"]
    ]
  };

  // Expected solution structure (for validation)
 

  const handleCodeChange = (e) => {
    setUserCode(e.target.value);
    setFeedback(''); // Clear feedback when user types
  };

  const validateCode = () => {
    try {
      // Parse the user's JSON
      const parsedCode = JSON.parse(userCode);
      
      // Check if it has the required fields
      const requiredFields = ['student_id', 'name', 'age', 'email', 'course', 'year', 'gpa'];
      const hasAllFields = requiredFields.every(field => Object.prototype.hasOwnProperty.call(parsedCode, field));
      
      if (hasAllFields) {
        setFeedback('🎉 Excellent! You\'ve successfully created a MongoDB document structure!');
        setIsCompleted(true);
        if (onTaskComplete) {
          onTaskComplete(1, 100); // Task 1, score 100
        }
      } else {
        const missingFields = requiredFields.filter(field => !Object.prototype.hasOwnProperty.call(parsedCode, field));
        setFeedback(`⚠️ Missing fields: ${missingFields.join(', ')}. Please add all required fields.`);
      }
    } catch {
      setFeedback('❌ Invalid JSON format. Please check your syntax (commas, quotes, brackets).');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BearMascot size="60px" />
              <div>
                <h1 className="text-3xl font-bold text-purple-800">📋 Task 1: Create MongoDB Documents</h1>
                <p className="text-gray-600">Convert table data into MongoDB document format</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Table Data */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📊 {tableData.title}
            </h2>
            <p className="text-gray-600 mb-6">
              Convert the first row of this table into a MongoDB document format using JSON.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-purple-100">
                    {tableData.headers.map((header, index) => (
                      <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold text-purple-800">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex === 0 ? 'bg-yellow-50 font-semibold' : 'bg-gray-50'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="font-bold text-yellow-800 mb-2">📝 Your Task:</h3>
              <p className="text-yellow-700">
                Create a MongoDB document for <strong>Alice Johnson</strong> (first row, highlighted in yellow) 
                using proper JSON format with appropriate field names.
              </p>
            </div>

            {/* Hint Section */}
            <div className="mt-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
              </button>
              
              {showHint && (
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <h4 className="font-bold text-blue-800 mb-2">💡 Hint:</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Use lowercase field names with underscores (e.g., "student_id")</li>
                    <li>• Numbers should not be in quotes (age, year, gpa)</li>
                    <li>• Strings should be in double quotes</li>
                    <li>• Don't forget commas between fields</li>
                    <li>• Use curly braces {`{ }`} to wrap the entire document</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Code Editor */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              💻 JSON Code Editor
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write your MongoDB document here:
              </label>
              <textarea
                value={userCode}
                onChange={handleCodeChange}
                placeholder={`{
  "student_id": "",
  "name": "",
  "age": ,
  "email": "",
  "course": "",
  "year": ,
  "gpa": 
}`}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ fontFamily: 'Consolas, Monaco, monospace' }}
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={validateCode}
                disabled={!userCode.trim()}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                ✅ Check My Code
              </button>
              
              <button
                onClick={() => {setUserCode('');setIsCompleted(false);}}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                🗑️ Clear
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-4 rounded-lg ${
                feedback.includes('🎉') ? 'bg-green-50 border-l-4 border-green-400' :
                feedback.includes('⚠️') ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                'bg-red-50 border-l-4 border-red-400'
              }`}>
                <p className={`font-medium ${
                  feedback.includes('🎉') ? 'text-green-800' :
                  feedback.includes('⚠️') ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  {feedback}
                </p>
              </div>
            )}

            {/* Expected Output Preview */}
            {/* <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">📋 Expected Structure:</h4>
              <pre className="text-sm text-gray-600 font-mono">
                {expectedStructure}
              </pre>
            </div> */}

            {/* Completion Status */}
            {isCompleted && (
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BearMascot size="40px" />
                    <div>
                      <h3 className="font-bold text-green-800">🎉 Task Completed!</h3>
                      <p className="text-green-700">Great job! You've successfully created a MongoDB document.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onBackToPath()}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
                  >
                    Continue to Next Module →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task1;
