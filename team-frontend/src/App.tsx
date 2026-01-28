import { Layout } from "./layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { DashBoard } from "./pages/dashboard";

export default function App(){
  return <>
    <h1 className="font-inter font-semibold">Lumin</h1>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/dashboard" element={<DashBoard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}