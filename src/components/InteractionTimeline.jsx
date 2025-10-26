import React from 'react';
import InteractionItem from './InteractionItem.jsx';
import '../App.css';

const InteractionTimeline = ({ interactions }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Interaction Timeline</h3>
      </div>
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {interactions.map((interaction, index) => (
          <InteractionItem key={index} interaction={interaction} />
        ))}
      </div>
    </div>
  );
};
export default InteractionTimeline;
