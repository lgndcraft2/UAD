import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const StudentHeader = ({ student, onBack }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-100 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm sm:text-base">Back to Students</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          {/* Student Info Section */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{student.fullName}</h1>
            
            {/* Contact Info - Stack on mobile, row on larger screens */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-blue-100 text-sm sm:text-base">
              <div className="flex items-center space-x-1">
                <Mail size={16} className="flex-shrink-0" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone size={16} className="flex-shrink-0" />
                <span>+{student.phoneNumber}</span>
              </div>
            </div>
            
            {/* Location & Date Info */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-2 text-blue-100 text-sm sm:text-base">
              <div className="flex items-center space-x-1">
                <MapPin size={16} className="flex-shrink-0" />
                <span>{student.country}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={16} className="flex-shrink-0" />
                <span>Joined {formatDate(student.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Stats Section - Full width on mobile, right side on desktop */}
          <div className="flex items-center justify-between sm:justify-start lg:justify-end space-x-3 lg:space-x-4">
            <div className="flex-1 sm:flex-none text-center sm:text-right">
              <div className="inline-flex bg-black items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-semibold mb-2 text-sm sm:text-base">
                Tier {student.tier}
              </div>
            </div>
            
            <div className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-center bg-opacity-10">
              <div className="text-xs sm:text-sm opacity-90">Lead Score</div>
              <div className="text-xl sm:text-2xl font-bold">{student.leadScore}/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentHeader;