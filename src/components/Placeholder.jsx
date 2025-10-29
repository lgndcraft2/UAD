import React from "react";
import "../App.css";
import { User } from "lucide-react";

const Placeholder = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <User size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-l font-semibold text-gray-600">No Ticket Selected</h3>
        <p className="text-gray-500 mt-2">Please select a ticket from the queue to view details</p>
      </div>
    </div>
  );
};
export default Placeholder;