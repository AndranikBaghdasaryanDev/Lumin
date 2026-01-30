import { Link } from "react-router-dom"

export const TermsPolicy = () => {
    return <>
                By continuing, you agree to our
                <Link to="#" className="text-blue-600 cursor-pointer"> Terms </Link>
                and
                <Link to="#" className="text-blue-600 cursor-pointer"> Privacy Policy</Link>
    </>
}