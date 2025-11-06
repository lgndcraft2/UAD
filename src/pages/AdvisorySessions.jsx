import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, Globe, Calendar, User, FileText, TrendingUp, Eye, ArrowUpDown } from 'lucide-react';

const AdvisorySessions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    channel: '',
    status: '',
    leadScoreRange: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'timestamp',
    direction: 'desc'
  });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);

  // Fetch sessions from Firestore
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        // Mock data matching your schema
        const mockSessions = [
          {
            session_id: 'SESSION-001',
            student_id: 'STU-001',
            name: 'Adeniji Fisayo',
            email: 'adeniji@email.com',
            channel: 'web',
            status: 'Escalated',
            timestamp: new Date('2025-11-03T09:05:00'),
            lead_score: 20,
            confidence_score: 'ai_frustration_score',
            detailed_report: 'Student expressed frustration with payment process. Requires immediate human intervention to resolve billing issues and address concerns about course access.'
          },
          {
            session_id: 'SESSION-002',
            student_id: 'STU-002',
            name: 'Kenny Giwa',
            email: 'kenny@email.com',
            channel: 'voice',
            status: 'Completed',
            timestamp: new Date('2025-11-02T14:30:00'),
            lead_score: 85,
            confidence_score: 'high_confidence',
            detailed_report: 'Successful consultation about DevOps course. Student showed high interest and understanding of prerequisites. Recommended enrollment path provided.'
          },
          {
            session_id: 'SESSION-003',
            student_id: 'STU-003',
            name: 'Sarah Williams',
            email: 'sarah@email.com',
            channel: 'chat',
            status: 'Completed',
            timestamp: new Date('2025-11-02T10:15:00'),
            lead_score: 92,
            confidence_score: 'high_confidence',
            detailed_report: 'Student inquired about advanced web development courses. Provided detailed breakdown of curriculum and career outcomes. Very engaged and ready to proceed.'
          },
          {
            session_id: 'SESSION-004',
            student_id: 'STU-004',
            name: 'Michael Chen',
            email: 'michael@email.com',
            channel: 'email',
            status: 'Pending',
            timestamp: new Date('2025-11-01T16:45:00'),
            lead_score: 45,
            confidence_score: 'low_confidence',
            detailed_report: 'Initial inquiry about course options. Student seems uncertain about commitment. Follow-up required to address concerns and provide additional information.'
          },
          {
            session_id: 'SESSION-005',
            student_id: 'STU-005',
            name: 'Emma Davis',
            email: 'emma@email.com',
            channel: 'web',
            status: 'Escalated',
            timestamp: new Date('2025-11-01T11:20:00'),
            lead_score: 65,
            confidence_score: 'medium_confidence',
            detailed_report: 'Technical issues during registration process. Student unable to complete payment. Escalated to technical support team for immediate resolution.'
          },
          {
            session_id: 'SESSION-006',
            student_id: 'STU-006',
            name: 'John Doe',
            email: 'john@email.com',
            channel: 'voice',
            status: 'Completed',
            timestamp: new Date('2025-10-31T13:00:00'),
            lead_score: 78,
            confidence_score: 'high_confidence',
            detailed_report: 'Student called regarding career transition to tech. Discussed multiple course options and created personalized learning path. Scheduled follow-up call.'
          }
        ];

        setSessions(mockSessions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Filter sessions
  const getFilteredSessions = () => {
    let filtered = [...sessions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(session =>
        session.name?.toLowerCase().includes(term) ||
        session.email?.toLowerCase().includes(term) ||
        session.session_id?.toLowerCase().includes(term)
      );
    }

    if (filters.channel) {
      filtered = filtered.filter(session => session.channel === filters.channel);
    }

    if (filters.status) {
      filtered = filtered.filter(session => session.status === filters.status);
    }

    if (filters.leadScoreRange) {
      const minScore = parseInt(filters.leadScoreRange);
      filtered = filtered.filter(session => session.lead_score >= minScore);
    }

    return filtered;
  };

  // Sort sessions
  const getSortedSessions = (sessionsToSort) => {
    const sorted = [...sessionsToSort];
    
    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (sortConfig.key === 'timestamp') {
        aValue = aValue instanceof Date ? aValue.getTime() : 0;
        bValue = bValue instanceof Date ? bValue.getTime() : 0;
      }

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
      channel: '',
      status: '',
      leadScoreRange: ''
    });
    setSearchTerm('');
  };

  const getChannelIcon = (channel) => {
    switch (channel?.toLowerCase()) {
      case 'voice': return <Phone size={16} className="text-blue-600" />;
      case 'chat': return <MessageSquare size={16} className="text-green-600" />;
      case 'email': return <Mail size={16} className="text-purple-600" />;
      case 'web': return <Globe size={16} className="text-orange-600" />;
      default: return <MessageSquare size={16} className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Escalated': ' text-red-700',
      'Completed': ' text-green-700',
      'Pending': ' text-yellow-700',
      'In Progress': ' text-blue-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getLeadScoreBadge = (score) => {
    if (score >= 80) return 'text-green-700';
    if (score >= 60) return 'text-yellow-700';
    if (score >= 40) return 'text-orange-700';
    return 'text-red-700';
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="text-blue-600" />
      : <ChevronDown size={14} className="text-blue-600" />;
  };

  const filteredSessions = getFilteredSessions();
  const displaySessions = getSortedSessions(filteredSessions);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sessions...</p>
        </div>
      </div>
    );
  }

  // Detail Modal
  if (selectedSession) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-4">
            <button
              onClick={() => {
                setSelectedSession(null);
                window.scrollTo(0, 0);
                }}
              className="text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              ← Back to Sessions
            </button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Session Details</h1>
                <p className="text-gray-600 mt-1">Session ID: {selectedSession.session_id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(selectedSession.status)}`}>
                {selectedSession.status}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{selectedSession.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{selectedSession.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Lead Score</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getLeadScoreBadge(selectedSession.lead_score)}`}>
                    {selectedSession.lead_score}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-600">Session Date</p>
                  <p className="font-semibold text-gray-900">
                    {selectedSession.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Session Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getChannelIcon(selectedSession.channel)}
                <div>
                  <p className="text-xs text-gray-600">Channel</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedSession.channel}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Confidence Score</p>
                <p className="font-semibold text-gray-900">{selectedSession.confidence_score}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Detailed Report</h2>
            <p className="text-gray-700 leading-relaxed">{selectedSession.detailed_report}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Advisory Sessions</h1>
          <p className="text-gray-600 mt-1">View and manage all student advisory sessions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or session ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filters</h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
              <select
                value={filters.channel}
                onChange={(e) => handleFilterChange('channel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Channels</option>
                <option value="web">Web</option>
                <option value="voice">Voice</option>
                <option value="chat">Chat</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Escalated">Escalated</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Score</label>
              <select
                value={filters.leadScoreRange}
                onChange={(e) => handleFilterChange('leadScoreRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Scores</option>
                <option value="80">80+ (High)</option>
                <option value="60">60+ (Medium)</option>
                <option value="40">40+ (Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Student</span>
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('channel')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Channel</span>
                      {getSortIcon('channel')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('lead_score')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Lead Score</span>
                      {getSortIcon('lead_score')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('status')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('timestamp')}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date</span>
                      {getSortIcon('timestamp')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displaySessions.map((session) => (
                  <tr key={session.session_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{session.name}</div>
                        <div className="text-sm text-gray-500">{session.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getChannelIcon(session.channel)}
                        <span className="text-sm text-gray-700 capitalize">{session.channel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getLeadScoreBadge(session.lead_score)}`}>
                        {session.lead_score}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold  ${getStatusBadge(session.status)}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {session.timestamp.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {session.timestamp.toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                            setSelectedSession(session);
                            window.scrollTo(0, 0);
                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{displaySessions.length}</span> sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorySessions;