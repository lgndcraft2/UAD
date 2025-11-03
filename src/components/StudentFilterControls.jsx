import React from 'react';
import { Filter } from 'lucide-react';

const StudentFilterControls = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Tier
          </label>
          <select
            value={filters.tier}
            onChange={(e) => onFilterChange('tier', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tiers</option>
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
          </select>
        </div>

        {/* Enrollment Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enrollment Status
          </label>
          <select
            value={filters.enrollmentStatus}
            onChange={(e) => onFilterChange('enrollmentStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Lead">Lead</option>
            <option value="Prospective">Prospective</option>
            <option value="Active">Active</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        {/* Lead Score Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lead Score
          </label>
          <select
            value={filters.leadScore}
            onChange={(e) => onFilterChange('leadScore', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Scores</option>
            <option value="80+">80+ (High)</option>
            <option value="60+">60+ (Medium)</option>
            <option value="40+">40+ (Low)</option>
            <option value="0+">All Scores</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default StudentFilterControls;