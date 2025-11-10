import React from 'react';
import { Mail, Calendar } from 'lucide-react';

const StudentTableRow = ({ student, onClick }) => {
  const getLeadScoreColor = (score) => {
    if (score >= 80) return 'text-green-700 bg-green-100';
    if (score >= 60) return 'text-yellow-700 bg-yellow-100';
    if (score >= 40) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      1: 'bg-purple-100 text-purple-700 border-purple-200',
      2: 'bg-blue-100 text-blue-700 border-blue-200',
      3: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[tier] || colors[3];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <tr
      onClick={onClick}
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      {/* Student Name */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-medium text-gray-900">{student.fullName || 'Unknown'}</div>
            <div className="text-sm text-gray-500">{student.student_id}</div>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <Mail size={16} className="text-gray-400" />
          <span>{student.email || 'N/A'}</span>
        </div>
      </td>

      {/* Lead Score */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getLeadScoreColor(student.leadScore)}`}>
          {student.leadScore || 0}
        </span>
      </td>

      {/* Current Tier */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getTierBadgeColor(student.tier)}`}>
          Tier {student.tier || 'N/A'}
        </span>
      </td>

      {/* Last Interaction */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm">{formatDate(student.lastInteractionDate)}</span>
        </div>
      </td>

      {/* Enrollment Status */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-700">{student.enrollmentStatus || 'Lead'}</span>
      </td>
    </tr>
  );
};
export default StudentTableRow;