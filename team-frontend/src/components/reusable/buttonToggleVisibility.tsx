import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';

export const ButtonToggleVisibility = ({type,text,disabled,src,onClick}:{type:"button" | "submit" | "reset",text?:string,onClick?:() => void,src?:string,disabled?:boolean}) => {
    return <>
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="absolute bottom-1/2 right-3 -translate-y-1/2 bg-transparent p-0 border-0 cursor-pointer"
          >
            {src == "hide" ? <EyeOff className='opacity-40 hover:opacity-90 transition-opacity' /> : <Eye className='opacity-40 hover:opacity-100 transition-opacity' />}
            {text}
          </button>
    </>
}