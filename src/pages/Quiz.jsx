import { Button, Grid, Slide, Typography, Box, IconButton, CircularProgress } from "@mui/material"
import { useParams } from "react-router-dom"
import Question from "../components/Question"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';
import store from "../redux/store";
import { addQuestions, selectOption } from '../redux/action/answer'
import { useNavigate, Link } from 'react-router-dom'

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
    const navigate = useNavigate()
    const [value, setValue] = useState(0)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionData, setQuestionData] = useState(null)
    const [countdown, setCountDown] = useState(10)
    const [quizData, setQuizData] = useState([])
    const [quizStarted, setQuizStarted] = useState(false)
    const [questionsFinished, setQuestionsFinished] = useState(false)
    const [timeIntervalId, setTimeIntervalId] = useState(undefined)
    const [totalTime, setTotalTime] = useState(0)
    const [startTime, setStartTime] = useState(0)

    const dispatch = useDispatch()
    const questionStoreData = useSelector((state) => state.question)


    let qIndex = 0
    var copyTimeInterval
    // let timeInterval

    // let startTime = new Date()

    const changeQuestionIndex = (e = null, optionClicked = false) => {
        let start = 11
        let timeInterval = setInterval(() => {
            // setTotalTime((prev) => prev + 1)
            start -= 1
            setCountDown(start)
            if (start === 0) {
                setQuestionIndex((prev) => {
                    if (prev < 10) {
                        qIndex = prev + 1
                        return prev + 1
                    }
                })

                if (qIndex < 9) {
                    changeQuestionIndex()
                }

                if (qIndex < 9) {
                    clearInterval(timeInterval)
                } else {
                    clearInterval(timeInterval)
                    let lastStart = 11
                    const lastInterval = setInterval(() => {
                        lastStart -= 1
                        setCountDown(lastStart)
                        if (lastStart === 0) {
                            setQuestionsFinished(true)
                            clearInterval(lastInterval)

                            let endTime = new Date()
                            let totalTimeInSeconds = (endTime.getTime() - startTime.getTime()) / 1000
                            let timeToSet = Math.round(totalTimeInSeconds)
                            setTotalTime(timeToSet)
                            
                            navigate(`/quiz-submitted/${bg}/${timeToSet}`)
                        }
                    }, 1000)
                }
            }
        }, 1000)

        setTimeIntervalId(timeInterval)
    }

    const handleStart = () => {
        setStartTime(new Date())

        // set initial(first) index for question
        setQuestionIndex(1)

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
                correctOption: decodeURIComponent(item.correct_answer),
                optionSelected: '',
                attempted: false
            }
        })
        console.log("@#res:", res)
        setQuizData(res)
        dispatch(addQuestions(res))
    }

    const handleOption = (e) => {
        document.getElementById(e.currentTarget.id).blur()
        const value = e.target.getAttribute("value");
        const index = e.currentTarget.id - 1

        // setCountDown(0)
        clearInterval(timeIntervalId)
        changeQuestionIndex()

        // set selected option to redux store
        dispatch(selectOption(index, value))

        setQuestionIndex((prev) => {
            if (prev < 10) {
                qIndex = prev + 1
                return prev + 1
            }
        })

        if (questionIndex == 10) {
            let endTime = new Date()
            let totalTimeInSeconds = (endTime.getTime() - startTime.getTime()) / 1000
            let timeToSet = Math.round(totalTimeInSeconds)
            setTotalTime(timeToSet)
            navigate(`/quiz-submitted/${bg}/${timeToSet}`)
        }
    }

    useEffect(() => {
        let uri = ''
        if (id == 0) uri = `https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986`
        else uri = `https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986&category=${id}`
        console.log("handleCategory:", uri)
        fetch(uri)
            .then((res) => res.json())
            .then((data) => {
                prepareQuizData(data.results)
            })
            .catch((error) => {
                console.log("error is getting data:", error)
            })
    }, [1])

    useEffect(() => {
        if (questionIndex) {
            let question = quizData[questionIndex - 1]
            if (question) setQuestionData(question)
        }
    }, [questionIndex])

    return (
        <Slide direction="left" in={true}>
            <div className="quiz-container" style={{ height: '100vh', backgroundColor: `#${bg}` }}>
                <Grid container className="quiz">
                    <Grid item xs={12} sm={12} md={7} style={{ textAlign: 'center' }}>
                        <div className="quiz-topbar">
                            <IconButton sx={{ color: 'white' }} component={Link} to="/">
                                <HighlightOffIcon fontSize='large' />
                            </IconButton>
                            {
                                quizStarted ? (
                                    !questionsFinished && (
                                        <CircularProgressWithLabel value={countdown * 10} />
                                    )
                                ) : (
                                    quizData.length > 0 ? (
                                        <div>
                                            <Button
                                                variant="contained"
                                                sx={{ border: '2px solid white' }}
                                                onClick={handleStart}
                                            >
                                                Start
                                            </Button>
                                        </div>
                                    ) : (
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress sx={{ color: 'white' }} />
                                        </Box>
                                    )
                                )
                            }
                            <IconButton disabled={true} sx={{ color: 'transparent !important', cursor: 'pointer' }} >
                                <HighlightOffIcon fontSize='large' />
                            </IconButton>
                        </div>
                        <Slide direction="down" in={true}>
                            <img className="quiz-image" src={`/images/category/${title}.svg`} title={title} />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        {
                            quizStarted && (
                                <Question
                                    value={questionIndex}
                                    countdown={countdown}
                                    handleOption={handleOption}
                                    questionData={questionData}
                                />
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        </Slide>
    )
}

export default Quiz