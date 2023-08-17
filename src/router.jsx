import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Quiz from "./pages/Quiz"
import QuizSubmitted from "./pages/QuizSubmitted"

const Router = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/:bg/:id/:title" element={<Quiz />} />
            <Route path="/quiz-submitted/:bg/:totalTime" element={<QuizSubmitted />} />
        </Routes>
    )
} 

export default Router