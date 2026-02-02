import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const Error = ({ message }: { message: string | undefined }) => {
  if (!message) return null;

  return (
    <div className="group relative w-full overflow-hidden rounded-xl border-2 border-red-100 bg-red-50/30 animate-shake shadow-sm mb-4">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
      
      <div className="flex items-start p-4 gap-4">
        {/* Large Professional Icon */}
        <div className="flex-shrink-0 bg-white p-2 rounded-lg shadow-sm border border-red-100">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-red-500 mb-1">
            Validation Error
          </span>
          <p className="text-sm font-semibold text-gray-800 leading-snug">
            {message}
          </p>
        </div>
      </div>

      {/* Subtle Bottom Detail */}
      <div className="px-4 py-1.5 bg-red-50 border-t border-red-100 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-medium text-red-400">Please check your details</span>
      </div>
    </div>
  );
};