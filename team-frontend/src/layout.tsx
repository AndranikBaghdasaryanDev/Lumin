import { Outlet } from "react-router-dom"
import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"

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
    </>
}