import React from 'react';


const StudentProfileOverview = ({ onboardingAnswers }) => {
  if (!onboardingAnswers) return null;

  const formatValue = (key, value) => {
    const displays = {
      achieve: { career: 'Career', business: 'Business', hobby: 'Personal', explore: 'Explore' },
      area: { data: 'Data Science', web: 'Web Dev', mobile: 'Mobile', frontend: 'Frontend', backend: 'Backend' },
      availability: { 'full-time': 'Full Time', 'part-time': 'Part Time', weekends: 'Weekends' },
      learningStyle: { reading: 'Reading', video: 'Video', interactive: 'Interactive', 'hands-on': 'Hands-on' },
      haveTakenTechCourses: value === 'yes' ? 'Yes' : 'No',
      preferredChannel: { email: 'Email', phone: 'Phone', chat: 'Chat', video: 'Video', sms: 'SMS' }
    };

    return displays[key]?.[value] || value;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-base font-bold text-gray-900">Profile Overview</h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-0.5">INTEREST</p>
            <p className="text-sm font-bold text-gray-900">{formatValue('area', onboardingAnswers.area.toUpperCase())}</p>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-600 font-semibold mb-0.5">GOAL</p>
            <p className="text-sm font-bold text-gray-900">{formatValue('achieve', onboardingAnswers.achieve.toUpperCase())}</p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-xs text-green-600 font-semibold mb-0.5">AVAILABILITY</p>
            <p className="text-sm font-bold text-gray-900">{formatValue('availability', onboardingAnswers.availability.toUpperCase())}</p>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <p className="text-xs text-orange-600 font-semibold mb-0.5">PREFERRED CHANNEL</p>
            <p className="text-sm font-bold text-gray-900">{formatValue('preferredChannel', onboardingAnswers.preferredChannel.toUpperCase())}</p>
          </div>
        </div>

        {/* Compact Details */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-600">Occupation</span>
            <span className="font-medium text-gray-900">{onboardingAnswers.occupation}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-600">Learning Style</span>
            <span className="font-medium text-gray-900">{formatValue('learningStyle', onboardingAnswers.learningStyle)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-600">Prior Courses</span>
            <span className="font-medium text-gray-900">{formatValue('haveTakenTechCourses', onboardingAnswers.haveTakenTechCourses ? onboardingAnswers.haveTakenTechCourse : "None")}</span>
          </div>
        </div>

        {/* Compact Tech Comfort */}
        {onboardingAnswers.comfortRating && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-700">Tech Comfort</p>
              <span className="text-sm font-bold text-gray-900">{onboardingAnswers.comfortRating}/5</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map(level => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full ${
                    level <= parseInt(onboardingAnswers.comfortRating)
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default StudentProfileOverview;