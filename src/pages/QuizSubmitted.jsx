import { useSelector } from "react-redux"
import Answer from "../components/Answer"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const QuizSubmitted = () => {
    const questionsData = useSelector((state) => state.question)
    console.log("questionsData:", questionsData)
    return (
        <>
            <div>Quiz submitted</div>
            <Button component={Link} to="/">Back to home</Button>
            {
                questionsData && (
                    questionsData.allQuestions.length > 0 && (
                        questionsData.allQuestions.map((answer) => <Answer answer={answer} />)
                    )
                )
            }
        </>
    )
}

export default QuizSubmitted