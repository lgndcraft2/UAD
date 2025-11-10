import { useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx';
import TaskQueue from '../components/TaskQueue.jsx';
import StudentFocusPanel from '../components/StudentFocusPanel.jsx';

import {db} from '../firebaseConfig.js';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

import '../App.css';

const UADLayout = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const studentCollectionRef = collection(db, 'inquiry_tickets');
    useEffect(() => {
        const fetchStudents = async () => {
            try{
              setIsLoading(true);
                const data = await getDocs(studentCollectionRef);
                if (data.empty) {
                    console.log("No inquiry tickets found.");
                    setStudents([]);
                    return;
                }

                console.log("Fetched inquiry tickets:", data.docs.map(doc => doc.data()));

                const inquiries = await Promise.all(
                    data.docs.map(async (document) => {
                        const ticketData = document.data();
                        const studentId = ticketData.student_id;

                        let studentData = null;
                        let advisorySessionData = [];
                        let advisorySession = null;
                        let ticketDataList = [];

                        if (studentId) {
                            const studentRef = doc(db, 'students', studentId);
                            const studentSnap = await getDoc(studentRef);
                            if (studentSnap.exists()) {
                                studentData = studentSnap.data();
                            }

                            const  currentAdvisorySessionRef = doc(db, 'advisory_sessions', ticketData.advisory_session);
                            const advisorSessionSnap = await getDoc(currentAdvisorySessionRef);

                            if (advisorSessionSnap.exists()) {
                                advisorySession = advisorSessionSnap.data();
                            }

                            const advisoryQuery = query(
                                collection(db, 'advisory_sessions'),
                                where('student_id', '==', studentId)
                            );

                            const ticketQuery = query(
                                collection(db, 'inquiry_tickets'),
                                where('student_id', '==', studentId)
                            );

                            const advisorySessionSnaps = await getDocs(advisoryQuery);
                            if (advisorySessionSnaps.empty) {
                              advisorySessionData = [];
                            }
                            else{ 
                              advisorySessionData = advisorySessionSnaps.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                                }));
                            }
                            

                            const ticketSessionSnaps = await getDocs(ticketQuery);
                            ticketDataList = ticketSessionSnaps.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                                }));
                        }


                        return {
                            id: document.id,
                            ...ticketData, 
                            student: studentData, 
                            advisorySessions: advisorySessionData, 
                            latestAdvisorySession: advisorySession,
                            tickets: ticketDataList,
                        };
                    })
                );
            console.log("Combined inquiry tickets with student data:", inquiries);
            setStudents(inquiries);
            }catch (err){
                console.error("Error fetching students: ", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();
    }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className='sticky top-0 z-30'>
          <Navbar isSidebarOpen={isSideBarOpen}
            onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)} />
        </div>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Inquiry Tickets...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className='sticky top-0 z-30'>
        <Navbar isSidebarOpen={isSideBarOpen}
          onToggleSidebar={() => setIsSideBarOpen(!isSideBarOpen)} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={`
          fixed inset-y-0 left-0 z-20 w-80 lg:w-96
          bg-gray-50 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:shrink-0 flex flex-col
          pt-16 md:pt-0
        `}>
          <div className="flex-1 overflow-y-auto">
            <TaskQueue
              tasks={students}
              selectedStudent={selectedStudent}
              onSelectStudent= {(student) => {
                setSelectedStudent(student);
                setIsSideBarOpen(false);
              }}
            />
          </div>
        </div>
        
        {/* --- MOBILE OVERLAY (dimmer) --- */}
        {isSideBarOpen && (
          <div 
            onClick={() => setIsSideBarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-10"
          ></div>
        )}
        
        {/* --- MAIN CONTENT (StudentFocusPanel) --- */}
        <div className="flex-1 overflow-hidden">
        
          <StudentFocusPanel student={selectedStudent} />
        </div>
      </div>
    </div>
  );
};

export default UADLayout;