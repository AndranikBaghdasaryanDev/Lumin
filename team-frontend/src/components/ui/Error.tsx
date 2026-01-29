import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

export const Error = ({message}:{message:string | undefined}) => {
  return (
      <div className="flex items-center space-x-4 bg-red-50 border border-red-400 text-red-700 rounded-xl p-6 shadow-md max-w-md w-full animate-fadeIn">
        {/* Red Icon */}
        <ExclamationCircleIcon className="w-10 h-10 text-red-600 flex-shrink-0" />
        
        {/* Error message */}
        <div className="text-lg font-semibold">{message}</div>
      </div>
  );
};
