import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const StudentHeader = ({ student, onBack }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getTierBadgeColor = (tier) => {
    const colors = {
      1: 'bg-purple-500',
      2: 'bg-blue-500',
      3: 'bg-gray-500'
    };
    return colors[tier] || colors[3];
  };

  const getLeadScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    if (score >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Students</span>
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
              {student.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{student.fullName}</h1>
              <div className="flex items-center space-x-4 mt-2 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone size={16} />
                  <span>{student.phoneNumber}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-blue-100">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{student.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {formatDate(student.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${getTierBadgeColor(student.tier)} text-white font-semibold mb-2`}>
                Tier {student.tier}
              </div>
              <div className={`bg-gradient-to-r ${getLeadScoreColor(student.leadScore)} px-4 py-2 rounded-lg text-center`}>
                <div className="text-sm opacity-90">Lead Score</div>
                <div className="text-2xl font-bold">{student.leadScore}/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentHeader;