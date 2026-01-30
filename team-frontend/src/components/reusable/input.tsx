export const Input = ({type,label,placeholder,classNameInput,classNameLabel}:{type:string,label:string,placeholder?:string,classNameInput?:string,classNameLabel?:string}) => {
    return <>
        <label className={classNameLabel}>{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}  
            className={classNameInput}
        />  
    </>
}