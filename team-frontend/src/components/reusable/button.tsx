export const Button = ({type,text,disabled,classNameButton,classNameImg,src,onClick}:{type:"button" | "submit" | "reset",text?:string,classNameButton?:string,classNameImg?:string,onClick?:() => void,src?:string,disabled?:boolean}) => {
    return <>
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNameButton}
          >
            <img
              src={src}
              className={classNameImg}
            />
            {text}
          </button>
    </>
}