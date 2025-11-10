import React from 'react';
import { CheckCircle, FileText, AlertCircle, Code } from 'lucide-react';

const CRMMetrics = ({ student }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Lead Score */}
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-1">Prior Courses</p>
                <p className="text-base font-bold text-gray-900 truncate">{student?.onboardingAnswers?.haveTakenTechCourses
                                                                    ? student.onboardingAnswers.haveTakenTechCourses.toUpperCase()
                                                                    : "None"}
                </p>
              </div>
            </div>

            {/* Engagement */}
            <div className="flex items-center space-x-3">
              <Code className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-1">Interest Area</p>
                <p className="text-base font-bold text-gray-900 truncate">{student?.reportText?.snapshot_data?.primary_match_field || "N/A"}</p>
              </div>
            </div>

            {/* Report */}
            <div className="flex items-center space-x-3">
              <FileText className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-1">AI Report</p>
                <p className="text-lg font-bold text-gray-900">{student.reportGeneratedAt ? 'Ready' : 'Pending'}</p>
              </div>
            </div>

            {/* Next Action */}
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0">
                <p className="text-xs text-gray-500 mb-1">Next Action</p>
                <p className="text-sm font-bold text-gray-900">Will Change Depending  sha</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default CRMMetrics;