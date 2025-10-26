// import React, { useState } from 'react';
import React from 'react';
import { X, Search } from 'lucide-react';
import '../App.css';

const TranscriptPopover = ({ interaction, onClose }) => {
//   const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Full Transcript</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        {/* <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div> */}

        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{interaction.transcript}</p>
        </div>
      </div>
    </div>
  );
};
export default TranscriptPopover;