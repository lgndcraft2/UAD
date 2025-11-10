import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LogOut, ChevronDown, Menu, X, LayoutDashboardIcon, Ticket, FileUser, CalendarRange } from 'lucide-react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { auth } from "../firebaseConfig.js";
import { signOut} from "firebase/auth";

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  //because I currently no get db access
  const advisorName = auth.currentUser ? auth.currentUser.email : "Advisor User";
  const advisorInitials = advisorName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);

  const location = useLocation();
  const isTicketsPage = location.pathname === '/tickets';

  const handleLogout = async () => {
    try{
      await signOut(auth);
    }catch(error){
      toast.error("Error logging out: " + error.message);
    }finally{
      toast.success("Logged out successfully!");
    }
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
            to="/dashboard"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            <span className="hidden md:block">Dashboard</span><span className='md:hidden'><LayoutDashboardIcon size={24} /></span>
          </NavLink>
          <NavLink
            to="/tickets"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            <span className="hidden md:block">Tickets</span><span className='md:hidden'><Ticket size={24} /></span>
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
            <span className="hidden md:block">Students</span><span className='md:hidden'><FileUser size={24} /></span>
          </NavLink>
          <NavLink
            to="/sessions"
            className={({ isActive}) => {
              return(
                isActive ? 'text-blue-600 font-medium transition-colors duration-200' 
                : 'text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200'
              );
            }}
          >
            <span className="hidden md:block">Sessions</span><span className='md:hidden'><CalendarRange size={24} /></span>
          </NavLink>
        </div>
        {/* Right Section - Advisor Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 bg-800 hover:bg-gray-100 rounded-lg px-2 py-1 md:px-4 md:py-2 transition-colors duration-200"
            >
              {/* Profile Picture */}
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {advisorInitials}
              </div>
              <span className="font-medium hidden md:block">{advisorName}</span>
              <ChevronDown 
                size={13} 
                className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 md:mt-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                <div className="py-1">
                  <button
                    className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700transition-colors duration-150 md:hidden"
                  >
                    <span className="font-medium">{advisorName}</span>
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
      <Toaster position="top-right" reverseOrder={false} />
    </nav>
  );
};

export default Navbar;