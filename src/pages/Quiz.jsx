import { Grid, Slide } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Question from "../components/Question"

const Quiz = () => {
    const { id, bg, title } = useParams()
    const [value, setValue] = useState(0)
    // setTimeout(()=>{
    //     setValue(value+1)
    // }, 1000)
    return (
        <Slide direction="left" in={true}>
            <div className="quiz-container" style={{ height: '100vh', backgroundColor: `#${bg}` }}>
                <Grid container className="quiz">
                    <Grid item xs={12} sm={12} md={8} style={{textAlign: 'center'}}>
                        <Slide direction="down" in={true}>
                            <img className="quiz-image" src={`/images/category/${title}.svg`} title={title} />
                        </Slide>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Question value={value} />
                    </Grid>
                </Grid>
            </div>
        </Slide>
    )
}

export default Quiz