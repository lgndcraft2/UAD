import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogOut, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  //because I currently no get db access
  const advisorName = "Some User";
  const advisorInitials = "SU";

  const location = useLocation();
  const isTicketsPage = location.pathname === '/';

  const handleLogout = () => {
    alert('Logout functionality would be fixed.... eventually');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm z-30">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* --- HAMBURGER TOGGLE (Mobile Only) --- */}
          {isTicketsPage && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              { isSidebarOpen ? <X size={24} /> : <Menu size={24} /> }
            </button>
          ) }
          {/* -------------------------------------- */}
          <div className="flex items-center space-x-3">
            <div>
              <div className="text-sm font-semibold hidden md:block text-gray-600">Catalyst System</div>
            </div>
          </div>
        </div>
        {/* Center Section - Links */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/tickets"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            Tickets
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            Students
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            Dashboard
          </NavLink>
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
              <span className="font-medium hidden md:block">{advisorName}</span>
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
                    className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <span className="font-medium md:hidden">{advisorName}</span>
                  </button>
                </div>
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