import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"

const Router = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> 
        </Routes>
    )
} 

export default Router
