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
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-4">
        <div className="flex items-start space-x-2 mb-3">
          <Sparkles size={20} className="text-green-600 mt-0.5" />
          <h3 className="text-sm font-bold text-green-900">Welcome Assessment</h3>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">
          {assessment.reportText.full_page_sections.welcome_summary}
        </p>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-start space-x-2 mb-3">
          <BarChart3 size={20} className="text-blue-600 mt-0.5" />
          <h3 className="text-sm font-bold text-blue-900">Reflection Analysis</h3>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">
          {assessment.reportText.full_page_sections.reflection_analysis}
        </p>
      </div>
    </div>
  );
};
export default AIAssessmentPanel;