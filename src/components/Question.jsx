import { Slide, Typography, Box } from "@mui/material"

const Question = (props) => {
    const { value, questionData, countdown, handleOption } = props
    return (
        <Slide direction="left" in={true}>
            <div className="quiz-question">
                {/* <h1>{countdown}</h1> */}
                <h6>Question {value || 10} of 10</h6>
                <h2>{questionData?.question}</h2>
                {
                    questionData && (
                        questionData.options.map((option) => {
                            return (
                                <p id={value} value={option} onClick={handleOption}>{option}</p>
                            )
                        })
                    )
                }
            </div>
        </Slide>
    )
}

export default Question