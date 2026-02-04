import { Outlet } from "react-router-dom"
import { Footer } from "./components/layout/Footer"
import { Header } from "./components/layout/Header"


export const Layout = ()  => {
    return <>
        <Header/>

        <main className="flex-1">
            <Outlet/>
        </main>

        <Footer/>
    </>
}