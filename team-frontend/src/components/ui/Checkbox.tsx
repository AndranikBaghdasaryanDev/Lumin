import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    error, 
    required = false, 
    description,
    className, 
    id, 
    checked,
    ...props 
  }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="relative flex items-center">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              checked={checked}
              className={clsx(
                'w-4 h-4 rounded-lg border-2 text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 cursor-pointer',
                error 
                  ? 'border-red-500' 
                  : 'border-gray-300 hover:border-gray-400',
                className
              )}
              {...props}
            />
            {/* Custom checkmark */}
            {checked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg 
                  className="w-3 h-3 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <label 
              htmlFor={checkboxId}
              className="text-sm font-medium text-gray-700 cursor-pointer select-none"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {description && (
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-red-600 font-medium animate-shake ml-7">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
