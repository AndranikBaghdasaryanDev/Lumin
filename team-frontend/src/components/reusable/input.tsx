export const Input = ({type,label,placeholder,error,...props}:{type:string,label:string,placeholder?:string,error:string}) => {
    return <>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            {...props} 
            className={`w-full h-11 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
              error ? "border-red-500" : "border-gray-300"
            }`}
        />  
    </>
}