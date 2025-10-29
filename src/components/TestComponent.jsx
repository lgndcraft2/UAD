import { useState, useEffect} from 'react';
import {db} from '../firebaseConfig.js';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';

const TestComponent = () => {
  const [students, setStudents] = useState([]);
  const studentCollectionRef = collection(db, 'inquiry_tickets');
    useEffect(() => {
        const fetchStudents = async () => {
            try{
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
                            advisorySessionData = advisorySessionSnaps.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                                }));

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
            }
        };
        fetchStudents();
    }, []);

  return (
    <div>
      <h2>Test Component - Inquiry Tickets</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.status}</strong> - {student.priority} (Channel: {student.channel})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TestComponent;
            