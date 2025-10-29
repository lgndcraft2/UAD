import React from 'react';
import '../App.css';

const StudentSummaryCard = ({ student }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{student.student.fullName}</h2>
          <p className="text-blue-100 mt-1">ID: {student.student_id}</p>
        </div>
        <div className="bg-black bg-opacity-20 px-3 w-20 rounded-[20px] py-1 flex justify-center">
          <span className="font-semibold text-center">TIER {student.student.tier}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-blue-100 text-sm">Onboarded Status</p>
          <p className="font-semibold">{student.hasOnboarded ? "Completed" : "Incompleted"}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Lead Score</p>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">{student.student.leadScore}</span>
            <span className="text-blue-100">/100</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentSummaryCard;