import { useState } from 'react';
import Navbar from './Navbar.jsx';
import TaskQueue from './TaskQueue.jsx';
import StudentFocusPanel from './StudentFocusPanel.jsx';
import '../App.css';

const UADLayout = () => {
  const [tasks] = useState([
    {
      id: 1,
      studentName: "John Smith",
      systemId: "STU-2024-001",
      reason: "High Frustration Score",
      channel: "Voice",
      priority: "high",
      waitTime: "15 min",
      tier: "Tier 2",
      enrollmentStatus: "Active",
      leadScore: 75,
      interactions: [
        {
          type: "Voice",
          title: "Voice Call - 10 min",
          timestamp: "2 hours ago",
          summary: "Discussed payment options and financial aid eligibility",
          transcript: "Advisor: Good morning, this is Sarah from Catalyst. How can I help you today?\n\nStudent: Hi, I'm really frustrated. I've been trying to figure out my payment plan for weeks now...\n\nAdvisor: I completely understand your frustration. Let me pull up your account and we'll get this sorted out right away.\n\n[Full conversation continues...]"
        },
        {
          type: "Chat",
          title: "Chatbot Session - 5 min",
          timestamp: "1 day ago",
          summary: "Initial inquiry about program costs",
          transcript: "Bot: Hello! How can I assist you today?\n\nStudent: I need information about tuition costs for the Computer Science program.\n\nBot: I'd be happy to help with that! Let me gather some information..."
        }
      ],
      aiAssessment: {
        coreInterests: ["Technology", "Problem Solving", "Career Growth"],
        skillsGap: "Limited experience with advanced programming concepts but shows strong analytical thinking",
        rationale: "Based on conversation history and engagement patterns, student shows high motivation for tech career. Financial concerns are primary barrier. Recommend emphasizing ROI and payment flexibility."
      },
      openTickets: [
        {
          title: "Payment Plan Setup",
          priority: "high",
          description: "Awaiting approval for extended payment plan"
        },
        {
          title: "Course Registration",
          priority: "medium",
          description: "Needs advisor approval for advanced course"
        }
      ]
    },
    {
      id: 2,
      studentName: "Emma Davis",
      systemId: "STU-2024-002",
      reason: "Payment Query",
      channel: "Chat",
      priority: "high",
      waitTime: "8 min",
      tier: "Tier 1",
      enrollmentStatus: "Prospective",
      leadScore: 92,
      interactions: [
        {
          type: "Email",
          title: "Email Inquiry",
          timestamp: "3 hours ago",
          summary: "Asked about scholarship opportunities",
          transcript: "Subject: Scholarship Information Request\n\nDear Admissions,\n\nI am very interested in your Business Administration program and would like to learn more about available scholarships..."
        }
      ],
      aiAssessment: {
        coreInterests: ["Business", "Leadership", "Entrepreneurship"],
        skillsGap: "Strong business acumen, seeking structured program to formalize knowledge",
        rationale: "High engagement score and proactive communication indicate strong conversion potential. Price sensitivity detected - emphasize value proposition and scholarship opportunities."
      },
      openTickets: [
        {
          title: "Scholarship Application",
          priority: "high",
          description: "Pending review of merit scholarship application"
        }
      ]
    },
    {
      id: 3,
      studentName: "Michael Chen",
      systemId: "STU-2024-003",
      reason: "Course Selection Guidance",
      channel: "Voice",
      priority: "medium",
      waitTime: "5 min",
      tier: "Tier 3",
      enrollmentStatus: "Active",
      leadScore: 68,
      interactions: [
        {
          type: "Voice",
          title: "Voice Call - 8 min",
          timestamp: "1 week ago",
          summary: "Enrollment confirmation and welcome call",
          transcript: "Advisor: Welcome to Catalyst, Michael! I'm calling to confirm your enrollment...\n\nStudent: Thank you! I'm really excited to start..."
        }
      ],
      aiAssessment: {
        coreInterests: ["Engineering", "Innovation", "Hands-on Learning"],
        skillsGap: "Solid foundation but needs guidance on specialization path",
        rationale: "Student is enrolled and engaged but showing signs of uncertainty about course selection. Proactive outreach recommended to prevent dropout risk."
      },
      openTickets: []
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-96 flex-shrink-0 border-r border-gray-200">
          <TaskQueue
            tasks={tasks}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
        </div>
        
        <div className="flex-1">
          <StudentFocusPanel student={selectedStudent} />
        </div>
      </div>
    </div>
  );
};

export default UADLayout;