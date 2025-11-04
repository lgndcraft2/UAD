import React from 'react';
import { Award, Target, CheckCircle } from 'lucide-react';


const AIReportCRMView = ({ reportText }) => {
  if (!reportText || !reportText.snapshot_data) return null;

  const { snapshot_data, report_type, viral_cta, compliance_info } = reportText;

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">AI-Generated Report</h2>
            <p className="text-sm text-gray-600 mt-1">{report_type}</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Full Report
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Assessment Summary */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Award size={20} className="text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 mb-1">Current Assessment</p>
              <p className="text-lg font-bold text-gray-900">{snapshot_data.current_level}</p>
            </div>
          </div>
        </div>

        {/* Recommended Path */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Target size={20} className="text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-900 mb-1">Recommended Path</p>
              <p className="text-base font-bold text-gray-900 mb-2 capitalize">{snapshot_data.primary_match_field}</p>
              <p className="text-sm text-gray-700">{snapshot_data.top_course_match}</p>
            </div>
          </div>
        </div>

        {/* AI Rationale */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-900 mb-2">AI Recommendation Rationale</p>
          <p className="text-sm text-gray-700">{snapshot_data.match_justification}</p>
        </div>

        {/* CTA Preview */}
        {viral_cta && (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Student-Facing CTA</p>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border border-purple-200">
              <p className="font-bold text-gray-900 mb-2">{viral_cta.heading}</p>
              <ul className="space-y-1">
                {viral_cta.benefits?.map((benefit, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center space-x-2">
                    <CheckCircle size={14} className="text-purple-600" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tracking Info */}
        {compliance_info?.conversion_tracking_id && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
            Tracking ID: <span className="font-mono">{compliance_info.conversion_tracking_id}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default AIReportCRMView;