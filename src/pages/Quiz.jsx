import { Button, Grid, Slide, Typography, Box, IconButton } from "@mui/material"
import { useParams } from "react-router-dom"
import Question from "../components/Question"
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} sx={{ color: 'white' }} thickness={4} size='3.1rem' />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" sx={{ color: 'white', margin: '1rem', fontSize: '1.2rem' }}>
                    {`${Math.round(props.value / 10)}`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

const Quiz = () => {
    const { id, bg, title } = useParams()
    const [value, setValue] = useState(0)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionData, setQuestionData] = useState(null)
    const [countdown, setCountDown] = useState(10)
    const [quizData, setQuizData] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)

    let qIndex = 0

    const changeQuestionIndex = () => {
        console.log("@@@@qIndex:", qIndex)
        let start = 11
        let timeInterval = setInterval(() => {
            start -= 1
            console.log("@@@@# start:", start)
            setCountDown(start)
            if (start === 0) {
                setQuestionIndex((prev) => {
                    if (prev < 10) {
                        qIndex = prev + 1
                        return prev + 1
                    }
                })

                console.log("questionIndex:", questionIndex)
                if (qIndex < 9) {
                    changeQuestionIndex()
                }
                clearInterval(timeInterval)
            }
        }, 1000)
    }

    const handleStart = () => {
        console.log("####questionIndex:", value)
        setQuizStarted(true)
        changeQuestionIndex()
    }

    const prepareQuizData = (data) => {
        let res = data.map((item, index) => {
            const incorrectOptions = item.incorrect_answers
            const randomIndex = Math.floor(Math.random() * 4)
            const options = incorrectOptions.splice(randomIndex, 0, item.correct_answer)
            return {
                id: index,
                question: decodeURIComponent(item.question),
                options: incorrectOptions.map((option) => decodeURIComponent(option)),
                correctOption: item.correct_answer,
                optionSelected: ''
            }
        })
        console.log("@#res:", res)
        setQuizData(res)
    }

    useEffect(() => {
        let uri = ''
        if (id == 0) uri = `https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986`
        else uri = `https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986&category=${id}`
        console.log("handleCategory:", uri)
        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
                console.log("@success:", data)
                console.log("@quizData:", quizData)
                prepareQuizData(data.results)
            })
            .catch((error) => {
                console.log("error is getting data:", error)
            })
    }, [1])

    useEffect(() => {
        console.log("!!questionIndex:", questionIndex)
        let question = quizData[questionIndex - 1]
        if (question) setQuestionData(question)
        console.log("!!question:", question)
    }, [questionIndex])

    return (
        <Slide direction="left" in={true}>
            <div className="quiz-container" style={{ height: '100vh', backgroundColor: `#${bg}` }}>
                <Grid container className="quiz">
                    <Grid item xs={12} sm={12} md={7} style={{ textAlign: 'center' }}>
                        <div className="quiz-topbar">
                            <IconButton sx={{ color: 'white' }}>
                                <HighlightOffIcon fontSize='large' />
                            </IconButton>
                            {
                                quizStarted ? (
                                    <CircularProgressWithLabel value={countdown * 10} />
                                ) : (
                                    <div>
                                        <Button
                                            variant="contained"
                                            className="bg1"
                                            onClick={handleStart}
                                        >
                                            Start
                                        </Button>
                                    </div>

                                )
                            }
                            <IconButton sx={{ color: 'white' }}>
                                <HighlightOffIcon fontSize='large' />
                            </IconButton>
                        </div>
                        <Slide direction="down" in={true}>
                            <img className="quiz-image" src={`/images/category/${title}.svg`} title={title} />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <Question
                            value={questionIndex}
                            countdown={countdown}
                            questionData={questionData}
                        />
                    </Grid>
                </Grid>
            </div>
        </Slide>
    )
}

export default Quiz