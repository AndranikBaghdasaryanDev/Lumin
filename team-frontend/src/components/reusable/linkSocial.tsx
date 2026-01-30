import { Link } from "react-router-dom"

export const LinkSocial = ({type,to,src,text,disabled}:{to:string,src?:string,disabled?:boolean,text:string,type:"button"|"submit"|"reset"}) => {  
    return <div>
        <Link to={to} >
            <button type={type} className="w-full h-11 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 disabled:opacity-40 cursor-not-allowed" disabled={disabled}>
                <img className="w-5 h-5" src={src} />
                {text}
            </button>
        </Link>
    </div>
}