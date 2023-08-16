import { useSelector } from "react-redux"
import Answer from "../components/Answer"
import { Link, useNavigate } from "react-router-dom"
import { Button, Grid, Slide } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

const QuizSubmitted = () => {
    const { bg } = useParams()
    const questionsData = useSelector((state) => state.question)
    const [attemptedCount, setAttemptedCount] = useState(0)
    const [correctCount, setCorrectCount] = useState(0)
    console.log("questionsData:", questionsData)

    useEffect(() => {
        let attempted = 0
        let correct = 0
        if (questionsData) {
            if (questionsData.allQuestions.length > 0) {
                questionsData.allQuestions.forEach((answer) => {
                    if (answer.attempted) attempted += 1
                    if (answer.correctOption === answer.optionSelected) correct += 1
                })
            }
        }
        setAttemptedCount(attempted)
        setCorrectCount(correct)
    }, [questionsData])
    return (
        <>
            <Slide direction="left" in={true}>
                <div className="quiz-container" style={{ backgroundColor: `#${bg}` }}>
                    <Grid container className="quiz">
                        <Grid item xs={12} sm={12} md={7} style={{ textAlign: 'center' }}>
                            <Button component={Link} to="/" className="back-to-home">Back to home</Button>
                        </Grid>

                        <Grid item xs={12} sm={12} md={7} style={{ textAlign: 'left' }}>
                            <div className="report">
                                <div>
                                    <p className="attempted">
                                        Attempted:
                                        <span>{attemptedCount}</span>
                                    </p>
                                    <p className="attempted">
                                        Unattempted:
                                        <span>{10 - attemptedCount}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="correct">
                                        Correct:
                                        <span>{correctCount}</span>
                                    </p>
                                    <p className="wrong">
                                        Wrong:
                                        <span>{10 - correctCount}</span>
                                    </p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7}>
                            {
                                questionsData && (
                                    questionsData.allQuestions.length > 0 && (
                                        questionsData.allQuestions.map((answer) => (<Answer
                                            answer={answer}
                                        />))
                                    )
                                )
                            }
                        </Grid>
                    </Grid>
                </div>
            </Slide>
        </>
    )
}

export default QuizSubmitted