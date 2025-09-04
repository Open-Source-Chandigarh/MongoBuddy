import React from 'react';

import Features from './Features';
import BearMascot from '../BearMascot';
import EnhancedHero from './EnhancedHero';

const Home = ({ onStartLearning }) => {
  return (
    <div>
      {/* Hero Section */}
     <EnhancedHero></EnhancedHero>

      {/* Test Bear - Simple version to check if it works */}
      <div className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Mongo Buddy - Interactive Learning
        </h2>
        <div className="flex justify-center">
          <BearMascot size={200} />
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Your friendly MongoDB learning companion!
        </p>
      </div>

      {/* Features */}
      <Features />

      {/* CTA */}
      <div className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Begin Your MongoDB Adventure?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of developers who have mastered MongoDB through our interactive platform
          </p>
          <button 
            onClick={onStartLearning}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
          >
            🚀 Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
