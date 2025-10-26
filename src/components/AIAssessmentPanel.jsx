import React from 'react';
import { TrendingUp } from 'lucide-react';
import '../App.css';

const AIAssessmentPanel = ({ assessment }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp size={20} className="text-purple-600" />
          <span>AI Assessment</span>
        </h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Core Interests</h4>
          <div className="flex flex-wrap gap-2">
            {assessment.coreInterests.map((interest, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Identified Skills Gap</h4>
          <p className="text-gray-700 text-sm">{assessment.skillsGap}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-900 mb-2">AI Recommendation Rationale</h4>
          <p className="text-purple-800 text-sm">{assessment.rationale}</p>
        </div>
      </div>
    </div>
  );
};
export default AIAssessmentPanel;