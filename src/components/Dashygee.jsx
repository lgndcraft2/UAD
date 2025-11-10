import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { Users, Ticket, AlertCircle, TrendingUp, Award, Activity, Clock, CheckCircle, Target } from 'lucide-react';

const DashyGee = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const studentCollectionRef = collection(db, "students");
  const ticketCollectionRef = collection(db, "inquiry_tickets");

  // Fetch data from Firestore - Replace with actual Firebase calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, ticketsData] = await Promise.all([
          getDocs(studentCollectionRef),
          getDocs(ticketCollectionRef),
        ]);

        const studentList = studentData.empty ? [] : studentData.docs.map(doc => doc.data());
        const ticketList = ticketsData.empty ? [] : ticketsData.docs.map(doc => doc.data());

        setStudents(studentList);
        setTickets(ticketList);

        console.log(students, tickets, studentData, ticketsData);
        const mockSessions = [
          {
            session_id: 'CjNFZklco1puXPHavPFU',
            student_id: 'MizsND2RlwhM6xWyXcvw3l8mRXn2',
            channel: 'web',
            confidence_score: 'ai_frustration_score',
            status: 'Escalated',
            transcript_link: null
          },
          {
            session_id: 'SESSION-002',
            student_id: 'kV4sSGNv31Mtkv0LR0uBqh6q11s1',
            channel: 'voice',
            confidence_score: 'high_confidence',
            status: 'Completed',
            transcript_link: 'https://example.com/transcript'
          }
        ];

        setSessions(mockSessions);

        // Calculate analytics
        const totalStudents = studentList.length;
        const tier1Count = studentList.filter(s => s.tier === 1).length;
        const tier2Count = studentList.filter(s => s.tier === 2).length;
        const tier3Count = studentList.filter(s => s.tier === 3).length;
        const onboardedCount = studentList.filter(s => s.hasOnboarded).length;

        const totalLeadScore = studentList.reduce((sum, s) => sum + (s.leadScore || 0), 0);
        const avgLeadScore = totalStudents > 0 ? Math.round(totalLeadScore / totalStudents) : 0;

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newStudents = studentList.filter(s => {
          if (!s.createdAt) return false;
          const createdDate = s.createdAt.toDate ? s.createdAt.toDate() : new Date(s.createdAt);
          return createdDate >= oneWeekAgo;
        }).length;

        const totalTickets = ticketList.length;
        const highPriority = ticketList.filter(t => t.priority === 'High').length;
        const mediumPriority = ticketList.filter(t => t.priority === 'Medium').length;
        const lowPriority = ticketList.filter(t => t.priority === 'Low').length;
        const openTickets = ticketList.filter(t => t.status === 'Open').length;
        const closedTickets = ticketList.filter(t => t.status === 'Closed').length;

        const escalatedSessions = mockSessions.filter(s => s.status === 'Escalated').length;

        setAnalytics({
          totalStudents,
          totalTickets,
          highPriorityTickets: highPriority,
          mediumPriorityTickets: mediumPriority,
          lowPriorityTickets: lowPriority,
          openTickets,
          closedTickets,
          tier1Students: tier1Count,
          tier2Students: tier2Count,
          tier3Students: tier3Count,
          onboardedStudents: onboardedCount,
          averageLeadScore: avgLeadScore,
          newStudentsThisWeek: newStudents,
          escalatedSessions
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate percentages for tier distribution
  const tierPercentages = {
    tier1: analytics.totalStudents > 0 ? ((analytics.tier1Students / analytics.totalStudents) * 100).toFixed(1) : 0,
    tier2: analytics.totalStudents > 0 ? ((analytics.tier2Students / analytics.totalStudents) * 100).toFixed(1) : 0,
    tier3: analytics.totalStudents > 0 ? ((analytics.tier3Students / analytics.totalStudents) * 100).toFixed(1) : 0
  };

  // Simple Pie Chart Component
  const PieChart = ({ data, colors, title }) => {
    const getCoordinatesForPercent = (percent) => {
      const x = 50 + 50 * Math.cos(2 * Math.PI * percent - Math.PI / 2);
      const y = 50 + 50 * Math.sin(2 * Math.PI * percent - Math.PI / 2);
      return [x, y];
    };

    const createSlice = (percent, offset) => {
      // Don't render slices with 0 or very small percentages
      if (percent < 0.001) return null;
      
      const [startX, startY] = getCoordinatesForPercent(offset);
      const [endX, endY] = getCoordinatesForPercent(offset + percent);
      const largeArcFlag = percent > 0.5 ? 1 : 0;

      return `M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    };

    // Filter out zero values and calculate total
    const validData = data.filter(item => item.value > 0);
    const total = validData.reduce((sum, item) => sum + item.value, 0);
    
    // If no valid data, show empty state
    if (validData.length === 0 || total === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">No data available</p>
          </div>
        </div>
      );
    }

    let cumulativePercent = 0;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-64 h-64">
            {validData.map((item, index) => {
              const percent = item.value / 100;
              const slice = createSlice(percent, cumulativePercent);
              const currentPercent = cumulativePercent;
              cumulativePercent += percent;
              
              if (!slice) return null;
              
              return (
                <path
                  key={index}
                  d={slice}
                  fill={colors[data.indexOf(item)]}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.count} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  // Bar Chart Component for Priority Tickets
  const BarChart = ({ data, colors, title }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: colors[index]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const tierData = [
    { label: 'Tier 1', value: parseFloat(tierPercentages.tier1), count: analytics.tier1Students },
    { label: 'Tier 2', value: parseFloat(tierPercentages.tier2), count: analytics.tier2Students },
    { label: 'Tier 3', value: parseFloat(tierPercentages.tier3), count: analytics.tier3Students }
  ];

  const tierColors = ['#9333EA', '#3B82F6', '#6B7280'];

  const priorityData = [
    { label: 'High Priority', value: analytics.highPriorityTickets },
    { label: 'Medium Priority', value: analytics.mediumPriorityTickets },
    { label: 'Low Priority', value: analytics.lowPriorityTickets }
  ];

  const priorityColors = ['#EF4444', '#F59E0B', '#10B981'];

  const statusData = [
    { 
      label: 'Open Tickets', 
      value: parseFloat(analytics.totalTickets > 0 ? ((analytics.openTickets / analytics.totalTickets) * 100).toFixed(1) : 0), 
      count: analytics.openTickets 
    },
    { 
      label: 'Closed Tickets', 
      value: parseFloat(analytics.totalTickets > 0 ? ((analytics.closedTickets / analytics.totalTickets) * 100).toFixed(1) : 0), 
      count: analytics.closedTickets 
    }
  ];

  const statusColors = ['#10B981', '#6B7280'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of students, tickets, and engagement metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                +{analytics.newStudentsThisWeek} this week
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.totalStudents}</h3>
            <p className="text-sm text-gray-600">Total Students</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <CheckCircle size={14} className="text-green-600" />
                <span>{analytics.onboardedStudents} onboarded ({analytics.totalStudents > 0 ? ((analytics.onboardedStudents / analytics.totalStudents) * 100).toFixed(0) : 0}%)</span>
              </div>
            </div>
          </div>

          {/* Total Tickets */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ticket className="text-purple-600" size={24} />
              </div>
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-semibold">
                {analytics.openTickets} open
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.totalTickets}</h3>
            <p className="text-sm text-gray-600">Total Tickets</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <AlertCircle size={14} className="text-orange-600" />
                <span>{analytics.escalatedSessions} escalated sessions</span>
              </div>
            </div>
          </div>

          {/* High Priority Tickets */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                Urgent
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.highPriorityTickets}</h3>
            <p className="text-sm text-gray-600">High Priority Tickets</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Clock size={14} className="text-orange-600" />
                <span>Requires immediate attention</span>
              </div>
            </div>
          </div>

          {/* Average Lead Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                analytics.averageLeadScore >= 70 ? 'bg-green-100 text-green-700' :
                analytics.averageLeadScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {analytics.averageLeadScore >= 70 ? 'Good' : analytics.averageLeadScore >= 50 ? 'Fair' : 'Low'}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{analytics.averageLeadScore}</h3>
            <p className="text-sm text-gray-600">Avg Lead Score</p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    analytics.averageLeadScore >= 70 ? 'bg-green-500' :
                    analytics.averageLeadScore >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${analytics.averageLeadScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tier Distribution Pie Chart */}
          <PieChart
            data={tierData}
            colors={tierColors}
            title="Student Distribution by Tier"
          />

          {/* Ticket Status Pie Chart */}
          <PieChart
            data={statusData}
            colors={statusColors}
            title="Ticket Status Overview"
          />
        </div>

        {/* Priority Breakdown Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            data={priorityData}
            colors={priorityColors}
            title="Tickets by Priority Level"
          />

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-purple-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">Tier 1 Students</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analytics.tier1Students}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-blue-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">Tier 2 Students</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analytics.tier2Students}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Award className="text-gray-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">Tier 3 Students</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analytics.tier3Students}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-3">
                  <Activity className="text-orange-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">Medium Priority</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analytics.mediumPriorityTickets}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <Target className="text-green-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">Low Priority</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{analytics.lowPriorityTickets}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashyGee;