import React from "react";
import { Phone, MessageSquare, Mail, Clock, Globe } from "lucide-react";
import '../App.css';


const TaskCard = ({ student, isSelected, onClick }) => {
  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'voice': return <Phone size={16} />;
      case 'chat': return <MessageSquare size={16} />;
      case 'email': return <Mail size={16} />;
      case 'web': return <Globe size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const cardBg = student.priority.toLowerCase() === 'high' ? 'bg-red-50 hover:bg-red-100 border-red-200' : 'bg-white hover:bg-gray-200 border-gray-200';
  const selectedStyle = isSelected ? 'ring-2 ring-blue-500' : '';

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${cardBg} ${selectedStyle} mb-3`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{student.student.fullName}</h3>
          <p className="text-sm text-gray-600">{student.escalation_reason}</p>
        </div>
        {student.priority.toLowerCase() === 'high' && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">HIGH</span>
        )}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          {getChannelIcon(student.latestAdvisorySession.channel)}
          <span>{student.latestAdvisorySession.channel}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{student.waitTime}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;