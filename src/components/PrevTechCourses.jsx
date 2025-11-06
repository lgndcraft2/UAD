import React from 'react';
import { CheckCircle } from 'lucide-react';

const PrevTechCourses = ({ student }) => {
  if (!student || !student.onboardingAnswers || !student.onboardingAnswers.whichCourse) {
    return null;
  }
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-base font-bold text-gray-900">Previous Tech Courses</h2>
            </div>
            <div className="p-4">
                <div className="flex flex-wrap gap-2">
                {student.onboardingAnswers.whichCourse.split(',').map((course, i) => (
                    <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200">
                    {course.trim()}
                    </span>
                ))}
                </div>
            </div>
        </div>
    );
};
export default PrevTechCourses;