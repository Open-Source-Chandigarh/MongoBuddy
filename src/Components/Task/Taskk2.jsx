import React, { useState } from 'react';
import BearMascot from '../BearMascot';

const Taskk2 = ({ onBackToPath, onTaskComplete }) => {
  const [currentTask, setCurrentTask] = useState(1);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Sample data for the tasks
  const sampleData = [
    { _id: 1, name: "Alice Johnson", age: 28, department: "Engineering", salary: 75000 },
    { _id: 2, name: "Bob Smith", age: 32, department: "Marketing", salary: 65000 },
    { _id: 3, name: "Carol Brown", age: 25, department: "Engineering", salary: 70000 },
    { _id: 4, name: "David Wilson", age: 29, department: "Sales", salary: 60000 },
    { _id: 5, name: "Eve Davis", age: 31, department: "HR", salary: 68000 }
  ];

  const tasks = [
    {
      id: 1,
      title: "CREATE Operation",
      description: "Add a new employee to the collection named \"Employees\" situated in database \"db\" ",
      instruction: "Write a MongoDB query to insert a new employee with name 'John Doe', age 27, department 'IT', and salary 72000.",
      hint: "Use insertOne() method with the document structure matching the existing data.",
      expectedAnswer: `db.employees.insertOne({
  name: "John Doe",
  age: 27,
  department: "IT",
  salary: 72000
})`,
      solution: "db.employees.insertOne({\n  name: \"John Doe\",\n  age: 27,\n  department: \"IT\",\n  salary: 72000\n})"
    },
    {
      id: 2,
      title: "READ Operation",
      description: "Find specific employees from the collection",
      instruction: "Write a MongoDB query to find all employees in the 'Engineering' department.",
      hint: "Use find() method with a filter object to match the department field.",
      expectedAnswer: `db.employees.find({
  department: "Engineering"
})`,
      solution: "db.employees.find({\n  department: \"Engineering\"\n})"
    },
    {
      id: 3,
      title: "UPDATE Operation",
      description: "Update employee information",
      instruction: "Write a MongoDB query to update Bob Smith's salary to 68000.",
      hint: "Use updateOne() method with a filter to find Bob Smith and $set operator to update the salary.",
      expectedAnswer: `db.employees.updateOne(
  { name: "Bob Smith" },
  { $set: { salary: 68000 } }
)`,
      solution: "db.employees.updateOne(\n  { name: \"Bob Smith\" },\n  { $set: { salary: 68000 } }\n)"
    },
    {
      id: 4,
      title: "DELETE Operation",
      description: "Remove an employee from the collection",
      instruction: "Write a MongoDB query to delete the employee with name 'Eve Davis'.",
      hint: "Use deleteOne() method with a filter to find the specific employee to delete.",
      expectedAnswer: `db.employees.deleteOne({
  name: "Eve Davis"
})`,
      solution: "db.employees.deleteOne({\n  name: \"Eve Davis\"\n})"
    }
  ];

  const currentTaskData = tasks[currentTask - 1];

  const checkAnswer = () => {
    const normalizeCode = (code) => {
      return code
        .replace(/\s+/g, ' ')
        .replace(/[\n\r]/g, '')
        .trim()
        .toLowerCase();
    };

    const userNormalized = normalizeCode(userCode);

    if (userNormalized.includes('db.employees') && 
        ((currentTask === 1 && userNormalized.includes('insertone') && userNormalized.includes('john doe') && userNormalized.includes('engineering')) ||
         (currentTask === 2 && userNormalized.includes('find') && userNormalized.includes('engineering')) ||
         (currentTask === 3 && userNormalized.includes('updateone') && userNormalized.includes('bob smith') && userNormalized.includes('$set')) ||
         (currentTask === 4 && userNormalized.includes('deleteone') && userNormalized.includes('eve davis')))) {
      
      setIsCorrect(true);
      setFeedback('🎉 Excellent! Your CRUD operation is correct!');
      
      if (!completedTasks.includes(currentTask)) {
        setCompletedTasks([...completedTasks, currentTask]);
      }
    } else {
      setIsCorrect(false);
      setFeedback('❌ Not quite right. Check the hint and try again!');
    }
  };

  const nextTask = () => {
    if (currentTask < 4) {
      setCurrentTask(currentTask + 1);
      setUserCode('');
      setFeedback('');
      setIsCorrect(false);
      setShowHint(false);
    }
  };

  const prevTask = () => {
    if (currentTask > 1) {
      setCurrentTask(currentTask - 1);
      setUserCode('');
      setFeedback('');
      setIsCorrect(false);
      setShowHint(false);
    }
  };

  const completeTask = () => {
    onTaskComplete('task2', Math.round((completedTasks.length / 4) * 100));
    onBackToPath();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToPath}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Learning Path</span>
            </button>
            <div className="flex items-center space-x-3">
              <BearMascot size="40px" />
              <h1 className="text-2xl font-bold text-gray-800">Task 2: CRUD Operations Practice</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Task {currentTask} of 4 • {completedTasks.length}/4 completed
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Data Table */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 p-2 rounded-lg mr-3">📊</span>
                Employee Collection Data
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-purple-50">
                      <th className="border border-gray-300 px-3 py-2 text-left">_id</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">name</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">age</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">department</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row) => (
                      <tr key={row._id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">{row._id}</td>
                        <td className="border border-gray-300 px-3 py-2">{row.name}</td>
                        <td className="border border-gray-300 px-3 py-2">{row.age}</td>
                        <td className="border border-gray-300 px-3 py-2">{row.department}</td>
                        <td className="border border-gray-300 px-3 py-2">${row.salary.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Progress</h3>
              <div className="grid grid-cols-4 gap-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg text-center text-sm font-medium cursor-pointer transition-colors ${
                      currentTask === task.id
                        ? 'bg-purple-600 text-white'
                        : completedTasks.includes(task.id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => {
                      setCurrentTask(task.id);
                      setUserCode('');
                      setFeedback('');
                      setIsCorrect(false);
                      setShowHint(false);
                    }}
                  >
                    {task.title.split(' ')[0]}
                    {completedTasks.includes(task.id) && <div className="text-xs">✅</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Task Interface */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-purple-800">{currentTaskData.title}</h2>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Task {currentTask}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{currentTaskData.description}</p>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                <p className="font-medium text-purple-800">Task:</p>
                <p className="text-purple-700">{currentTaskData.instruction}</p>
              </div>

              {/* Code Editor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your MongoDB Query:
                </label>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Write your MongoDB query here..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={checkAnswer}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Check Answer
                </button>
                
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>

                <button
                  onClick={() => setUserCode(currentTaskData.solution)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Show Solution
                </button>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="font-medium text-yellow-800">Hint:</p>
                  <p className="text-yellow-700">{currentTaskData.hint}</p>
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div className={`p-4 rounded-lg mb-4 ${
                  isCorrect 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {feedback}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevTask}
                  disabled={currentTask === 1}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentTask === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous Task
                </button>

                {currentTask < 4 ? (
                  <button
                    onClick={nextTask}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Next Task
                  </button>
                ) : completedTasks.length === 4 ? (
                  <button
                    onClick={completeTask}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Complete Task 2 →
                  </button>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Complete all tasks to continue
                  </div>
                )}
              </div>
            </div>

            {/* Additional Task Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">💡 CRUD Operations Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">CREATE</span>
                  <span className="text-gray-600">insertOne(), insertMany()</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">READ</span>
                  <span className="text-gray-600">find(), findOne()</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">UPDATE</span>
                  <span className="text-gray-600">updateOne(), updateMany()</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">DELETE</span>
                  <span className="text-gray-600">deleteOne(), deleteMany()</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskk2;
