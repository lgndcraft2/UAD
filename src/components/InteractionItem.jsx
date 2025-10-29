import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Globe } from 'lucide-react';
import TranscriptPopover from './TranscriptPopover.jsx';
import '../App.css';

const InteractionItem = ({ interaction }) => {
  const [showTranscript, setShowTranscript] = useState(false);

  const getIcon = () => {
    switch (interaction.channel.toLowerCase()) {
      case 'voice': return <Phone size={18} className="text-blue-600" />;
      case 'chat': return <MessageSquare size={18} className="text-green-600" />;
      case 'email': return <Mail size={18} className="text-purple-600" />;
      case 'web': return <Globe size={18} className="text-yellow-600" />;
      default: return <MessageSquare size={18} className="text-gray-600" />;
    }
  };

  return (
    <>
      <div
        onClick={() => setShowTranscript(true)}
        className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
      >
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900"> {interaction.title ? interaction.title : "No Title Available"}</h4>
            <span className="text-xs text-gray-500">{interaction.timestamp ? interaction.timestamp : "same"}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{interaction.summary ? interaction.summary : "same"}</p>
        </div>
      </div>

      {showTranscript && (
        <TranscriptPopover
          interaction={interaction}
          onClose={() => setShowTranscript(false)}
        />
      )}
    </>
  );
};
export default InteractionItem;