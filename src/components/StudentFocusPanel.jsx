import React from 'react';
import Placeholder from './Placeholder.jsx';
import StudentSummaryCard from './StudentSummaryCard.jsx';
import InteractionTimeline from './InteractionTimeline.jsx';
import AIAssessmentPanel from './AIAssessmentPanel.jsx';
import StudentOpenTickets from './StudentOpenTickets.jsx';
import '../App.css';

const StudentFocusPanel = ({ student }) => {
  if (!student) {
    return <Placeholder />;
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <StudentSummaryCard student={student} />
        <InteractionTimeline interactions={student.interactions} />
        <AIAssessmentPanel assessment={student.aiAssessment} />
        <StudentOpenTickets tickets={student.openTickets} />
      </div>
    </div>
  );
};
export default StudentFocusPanel;