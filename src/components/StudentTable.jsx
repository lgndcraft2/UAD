import React from 'react';
import { ArrowUpDown, ChevronUp, ChevronDown, User } from 'lucide-react';
import StudentTableRow from './StudentTableRow.jsx';

const StudentTable = ({ students, onStudentClick, sortConfig, onSort }) => {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="text-blue-600" />
      : <ChevronDown size={14} className="text-blue-600" />;
  };  

  const SortableHeader = ({ columnKey, children }) => (
    <th
      onClick={() => onSort(columnKey)}
      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {getSortIcon(columnKey)}
      </div>
    </th>
  );

  if (students.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <User size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Students Found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader columnKey="fullName">Student Name</SortableHeader>
              <SortableHeader columnKey="email">Email</SortableHeader>
              <SortableHeader columnKey="leadScore">Lead Score</SortableHeader>
              <SortableHeader columnKey="tier">Current Tier</SortableHeader>
              <SortableHeader columnKey="lastInteractionDate">Last Interaction</SortableHeader>
              <SortableHeader columnKey="enrollmentStatus">Status</SortableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                onClick={() => onStudentClick(student)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{students.length}</span> students
        </p>
      </div>
    </div>
  );
};
export default StudentTable;