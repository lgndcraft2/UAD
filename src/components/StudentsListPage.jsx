import React, { useState, useEffect } from 'react';
import StudentSearchBar from './StudentSearchBar.jsx';
import StudentFilterControls from './StudentFilterControls.jsx';
import StudentTable from './StudentTable.jsx';

const StudentListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tier: '',
    enrollmentStatus: '',
    leadScore: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'leadScore',
    direction: 'desc'
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data fetch - Replace with actual Firestore fetch
  useEffect(() => {
    const fetchStudents = async () => {
      // Mock student data matching Firestore schema
      const mockStudents = [
        {
          student_id: 'kV4sSGNv31Mtkv0LR0uBqh6q11s1',
          fullName: 'Kenny Giwa',
          email: 'madile@mail.com',
          phoneNumber: '2348445467678',
          age: '18-24',
          country: 'Nigeria',
          tier: 1,
          leadScore: 20,
          enrollmentStatus: 'Lead',
          hasOnboarded: true,
          createdAt: new Date('2025-10-28'),
          lastInteractionDate: new Date('2025-11-01'),
          onboardingAnswers: {
            achieve: 'career',
            area: 'data',
            availability: 'part-time',
            occupation: 'Graduate',
            learningStyle: 'reading',
            projectEnjoyed: 'games',
            comfortRating: '2',
            haveTakenTechCourses: 'no',
            preferredChannel: 'email'
          }
        },
        {
          student_id: 'STUDENT-002',
          fullName: 'Emma Davis',
          email: 'emma.davis@email.com',
          phoneNumber: '2348445467679',
          age: '25-34',
          country: 'Ghana',
          tier: 2,
          leadScore: 85,
          enrollmentStatus: 'Active',
          hasOnboarded: true,
          createdAt: new Date('2025-10-15'),
          lastInteractionDate: new Date('2025-11-02')
        },
        {
          student_id: 'STUDENT-003',
          fullName: 'Michael Chen',
          email: 'michael.chen@email.com',
          phoneNumber: '2348445467680',
          age: '18-24',
          country: 'Nigeria',
          tier: 3,
          leadScore: 65,
          enrollmentStatus: 'Prospective',
          hasOnboarded: false,
          createdAt: new Date('2025-09-20'),
          lastInteractionDate: new Date('2025-10-28')
        },
        {
          student_id: 'STUDENT-004',
          fullName: 'Sarah Williams',
          email: 'sarah.williams@email.com',
          phoneNumber: '2348445467681',
          age: '35-44',
          country: 'Kenya',
          tier: 1,
          leadScore: 92,
          enrollmentStatus: 'Active',
          hasOnboarded: true,
          createdAt: new Date('2025-08-10'),
          lastInteractionDate: new Date('2025-11-03')
        },
        {
          student_id: 'STUDENT-005',
          fullName: 'John Smith',
          email: 'john.smith@email.com',
          phoneNumber: '2348445467682',
          age: '25-34',
          country: 'Nigeria',
          tier: 2,
          leadScore: 45,
          enrollmentStatus: 'Lead',
          hasOnboarded: true,
          createdAt: new Date('2025-10-01'),
          lastInteractionDate: new Date('2025-10-30')
        },
        {
          student_id: 'STUDENT-006',
          fullName: 'Amara Okafor',
          email: 'amara.okafor@email.com',
          phoneNumber: '2348445467683',
          age: '18-24',
          country: 'Nigeria',
          tier: 1,
          leadScore: 78,
          enrollmentStatus: 'Prospective',
          hasOnboarded: true,
          createdAt: new Date('2025-10-20'),
          lastInteractionDate: new Date('2025-11-02')
        }
      ];

      setStudents(mockStudents);
      setLoading(false);
    };

    fetchStudents();
  }, []);

  // Filter students based on search and filters
  const getFilteredStudents = () => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(student =>
        student.fullName?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.student_id?.toLowerCase().includes(term)
      );
    }

    // Tier filter
    if (filters.tier) {
      filtered = filtered.filter(student => student.tier === parseInt(filters.tier));
    }

    // Enrollment status filter
    if (filters.enrollmentStatus) {
      filtered = filtered.filter(student => student.enrollmentStatus === filters.enrollmentStatus);
    }

    // Lead score filter
    if (filters.leadScore) {
      const minScore = parseInt(filters.leadScore);
      filtered = filtered.filter(student => student.leadScore >= minScore);
    }

    return filtered;
  };

  // Sort students
  const getSortedStudents = (studentsToSort) => {
    const sorted = [...studentsToSort];
    
    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Handle dates
      if (sortConfig.key === 'lastInteractionDate' || sortConfig.key === 'createdAt') {
        aValue = aValue instanceof Date ? aValue.getTime() : 0;
        bValue = bValue instanceof Date ? bValue.getTime() : 0;
      }

      // Handle strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      tier: '',
      enrollmentStatus: '',
      leadScore: ''
    });
    setSearchTerm('');
  };

  const handleStudentClick = (student) => {
    // In production: navigate to student detail page
    console.log('Navigate to student:', student.student_id);
    alert(`Opening profile for: ${student.fullName}\n\nIn production, this would navigate to the student's detailed profile page.`);
  };

  const filteredStudents = getFilteredStudents();
  const displayStudents = getSortedStudents(filteredStudents);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage and view all students in the system</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Search Bar */}
        <StudentSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Filter Controls */}
        <StudentFilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Student Table */}
        <StudentTable
          students={displayStudents}
          onStudentClick={handleStudentClick}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default StudentListPage;