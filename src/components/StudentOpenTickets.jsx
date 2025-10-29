import React from 'react';
import { FileText } from 'lucide-react';
import '../App.css';

const StudentOpenTickets = ({ tickets }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Open Tickets</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {tickets.map((ticket, i) => (
          <div key={i} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-gray-600" />
                <span className="font-medium text-gray-900">{ticket.title ? ticket.title : "awnn"}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                ticket.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {ticket.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{ticket.description ? ticket.description : "omo"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudentOpenTickets;