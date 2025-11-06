import React from "react";
import { FileText, Calendar } from "lucide-react";

const Inquiries = ({ inquiries }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="text-gray-600">No inquiries found.</p>
        ) : (
            <ul className="space-y-4">
                {inquiries.map((inquiry) => (
                   <li key={inquiry.id} className="border-b border-gray-200 last:border-b-0">
        <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                            {inquiry.escalation_reason || 'General Inquiry'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            inquiry.priority === 'High' 
                                ? 'bg-red-100 text-red-700 border-red-300' 
                                : inquiry.priority === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                                : 'bg-green-100 text-green-700 border-green-300'
                        }`}>
                            {inquiry.priority}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <FileText size={14} />
                            <span>Session: {inquiry.advisory_session}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{inquiry.date ? new Date(inquiry.date).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        inquiry.status === 'Open' 
                            ? 'bg-green-100 text-green-700 border-green-300' 
                            : inquiry.status === 'Closed'
                            ? 'bg-gray-100 text-gray-700 border-gray-300'
                            : 'bg-blue-100 text-blue-700 border-blue-300'
                    }`}>
                        {inquiry.status}
                    </span>
                </div>
            </div>
            {inquiry.message && (
                <p className="text-sm text-gray-700 leading-relaxed">{inquiry.message}</p>
            )}
        </div>
    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default Inquiries;