import React, { useState, useEffect } from 'react';
import StudentSearchBar from './StudentSearchBar.jsx';
import StudentFilterControls from './StudentFilterControls.jsx';
import StudentTable from './StudentTable.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import StudentDetailPage from './StudentDetails.jsx';

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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const studentCollectionRef = collection(db, 'students');
  // Simulated data fetch - Replace with actual Firestore fetch
  useEffect(() => {
    const fetchStudents = async () => {
      try{
        setLoading(true);
        const data = await getDocs(studentCollectionRef);
        if (data.empty){
            console.log("No data Found")
            setStudents([]);
            return
        }
        const studentsList = data.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Fetched students", studentsList);
        setStudents(studentsList);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
    // if (filters.enrollmentStatus) {
    //   filtered = filtered.filter(student => student.enrollmentStatus === filters.enrollmentStatus);
    // }

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
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
};

  const filteredStudents = getFilteredStudents();
  const displayStudents = getSortedStudents(filteredStudents);


  if (selectedStudent) {
    return <StudentDetailPage student={selectedStudent} onBack={handleBackToList} />;
    }

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