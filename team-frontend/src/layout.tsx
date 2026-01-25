import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"
import { Error } from "./components/ui/Error"
import { Loading } from "./components/ui/Loading"

export const Layout = ()  => {
    return <>
        <header>
            <Header/>
        </header>
        <footer>
            <Footer/>
        </footer>
        <Loading/>
        <Error message="Wrong some"/>
    </>
}