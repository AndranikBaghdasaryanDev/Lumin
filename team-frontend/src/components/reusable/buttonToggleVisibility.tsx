import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

export const ButtonToggleVisibility = ({type,text,disabled,src,onClick}:{type:"button" | "submit" | "reset",text?:string,onClick?:() => void,src?:string,disabled?:boolean}) => {
    return <>
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="absolute bottom-1/2 right-4 -translate-y-1/2 bg-transparent p-2 border-0 cursor-pointer rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            {src == "hide" ? <EyeOff className='w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors' /> : <Eye className='w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors' />}
            {text}
          </button>
    </>
}