import React from 'react';
import { User } from 'lucide-react';
import type { InstructorCardProps } from '../../types/instructor';

export const InstructorCard: React.FC<InstructorCardProps> = ({ instructor }) => {
  if (!instructor) {
    return null;
  }

  const fullName = `${instructor.firstName || ''} ${instructor.lastName || ''}`.trim();
  const initials = fullName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getInitialsColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-gray-500',
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {instructor.profileImage ? (
            <img
              src={instructor.profileImage}
              alt={fullName}
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          {/* Fallback Avatar */}
          <div 
            className={`h-16 w-16 rounded-full flex items-center justify-center text-white font-semibold text-lg ${
              instructor.profileImage ? 'hidden' : ''
            } ${getInitialsColor(fullName)}`}
          >
            {initials || <User className="w-8 h-8" />}
          </div>
        </div>

        {/* Instructor Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {fullName || 'Instructor'}
          </h3>
          
          {/* Sprint 3 placeholders - show minimal info for Sprint 2 */}
          <div className="mt-1 space-y-1">
            {/* Bio placeholder */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {instructor.bio || 'Expert instructor with extensive experience in the field.'}
            </p>
            
            {/* Stats placeholders for Sprint 3 */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>
                {instructor.coursesCount !== undefined 
                  ? `${instructor.coursesCount} courses` 
                  : 'Experienced instructor'
                }
              </span>
              <span>
                {instructor.studentsCount !== undefined 
                  ? `${instructor.studentsCount.toLocaleString()} students` 
                  : '•'
                }
              </span>
              {instructor.instructorRating !== undefined && (
                <span>⭐ {instructor.instructorRating.toFixed(1)}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional info for Sprint 3 - hidden for now */}
      {false && instructor.bio && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            {instructor.bio}
          </p>
        </div>
      )}
    </div>
  );
};

export default InstructorCard;
