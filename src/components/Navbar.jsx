import React, { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  //because I currently no get db access
  const advisorName = "Some User";
  const advisorInitials = "SU";

  const handleLogout = () => {
    alert('Logout functionality would be fixed.... eventually');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div>
              <div className="text-sm font-semibold text-gray-600">Catalyst System</div>
              <div className="text-lg font-bold text-gray-900">Unified Agent Desktop</div>
            </div>
          </div>
        </div>

        {/* Right Section - Advisor Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 bg-800 hover:bg-gray-100 rounded-lg px-4 py-2 transition-colors duration-200"
            >
              {/* Profile Picture */}
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {advisorInitials}
              </div>
              <span className="font-medium">{advisorName}</span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <LogOut size={18} className="text-900" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;