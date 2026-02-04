import { Link } from "react-router-dom"

export const TermsPolicy = () => {
    return <>
                By continuing, you agree to our
                <Link to="#" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors duration-200"> Terms </Link>
                and
                <Link to="#" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium transition-colors duration-200"> Privacy Policy</Link>
    </>
}