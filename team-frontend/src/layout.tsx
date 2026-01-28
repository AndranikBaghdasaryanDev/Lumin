import { Outlet } from "react-router-dom"
import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"
import { Error } from "./components/ui/Error"
import { Loading } from "./components/ui/Loading"

export const Layout = ()  => {
    return <>
        <header>
            <Header/>
        </header>

        <main>
            <Outlet/>
        </main>

        <footer>
            <Footer/>
        </footer>
        <Loading/>
        <Error message="Wrong some"/>
    </>
}