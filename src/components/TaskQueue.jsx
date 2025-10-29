import '../App.css';
import React from 'react';
import TaskCard from './TaskCard.jsx';

const TaskQueue = ({ tasks, selectedStudent, onSelectStudent }) => {
  const highPriorityTasks = tasks.filter(t => t.priority.toLowerCase() === 'high');
  console.log("High Priority Tasks:", highPriorityTasks);
  const standardTasks = tasks.filter(t => t.priority.toLowerCase() !== 'high');

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-900">Prioritized Task Queue</h2>
        <p className="text-sm text-gray-600">{tasks.length} students waiting</p>
      </div>

      <div className="p-4">
        {highPriorityTasks.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold text-red-600 uppercase mb-3">High Priority</h3>
            {highPriorityTasks.map((task, i) => (
              <div className='space-y-2' key={i}>
                <TaskCard
                  student={task}
                  isSelected={selectedStudent?.id === task.id}
                  onClick={() => onSelectStudent(task)}
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-gray-600 uppercase mb-3">Standard Inquiry</h3>
          {standardTasks.map(task => (
            <div className='space-y-2' key={task.id}>
              <TaskCard
                student={task}
                isSelected={selectedStudent?.id === task.id}
                onClick={() => onSelectStudent(task)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TaskQueue;