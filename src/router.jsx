import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Quiz from "./pages/Quiz"

const Router = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/:bg/:id/:title" element={<Quiz />} />
        </Routes>
    )
} 

export default Router