import { Link } from "react-router-dom"

export const LinkSocial = ({type,to,src,text,disabled}:{to:string,src?:string,disabled?:boolean,text:string,type:"button"|"submit"|"reset"}) => {  
    return <div>
        {disabled ? (
            <button
                type={type}
                disabled={disabled}
                aria-disabled={disabled}
                className="w-full h-12 border-2 border-black rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium text-gray-700"
            >
                <img className="w-5 h-5" src={src} />
                {text}
            </button>
        ) : (
            <Link to={to} >
                <button
                    type={type}
                    disabled={disabled}
                    aria-disabled={disabled}
                    className="w-full h-12 border-2 border-black rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 font-medium text-gray-700"
                >
                    <img className="w-5 h-5" src={src} />
                    {text}
                </button>
            </Link>
        )}
    </div>
}