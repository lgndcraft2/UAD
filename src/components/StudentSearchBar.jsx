import { Search } from 'lucide-react'

const StudentSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search size={20} className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name, email, or student ID..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
export default StudentSearchBar;