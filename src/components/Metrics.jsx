import React from 'react';
import { TrendingUp, Activity, FileText, AlertCircle } from 'lucide-react';

const CRMMetrics = ({ student }) => {
  const getLeadScoreStatus = (score) => {
    if (score >= 80) return { label: 'Hot', color: 'green' };
    if (score >= 60) return { label: 'Warm', color: 'yellow' };
    if (score >= 40) return { label: 'Cool', color: 'orange' };
    return { label: 'Cold', color: 'red' };
  };

  const scoreStatus = getLeadScoreStatus(student.leadScore);
  
  const getScoreColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      red: 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[color];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="grid grid-cols-4 gap-6">
        {/* Lead Score */}
        <div className="flex items-center space-x-3">
          <TrendingUp className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500 mb-1">Lead Score</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{student.leadScore}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${getScoreColor(scoreStatus.color)}`}>
                {scoreStatus.label}
              </span>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center space-x-3">
          <Activity className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500 mb-1">Engagement</p>
            <p className="text-lg font-bold text-gray-900">{student.hasOnboarded ? 'High' : 'Low'}</p>
          </div>
        </div>

        {/* Report */}
        <div className="flex items-center space-x-3">
          <FileText className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500 mb-1">AI Report</p>
            <p className="text-lg font-bold text-gray-900">{student.reportGeneratedAt ? 'Ready' : 'Pending'}</p>
          </div>
        </div>

        {/* Next Action */}
        <div className="flex items-center space-x-3">
          <AlertCircle className="text-gray-400" size={20} />
          <div>
            <p className="text-xs text-gray-500 mb-1">Next Action</p>
            <p className="text-sm font-bold text-gray-900">Will Change Depending  sha</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CRMMetrics;