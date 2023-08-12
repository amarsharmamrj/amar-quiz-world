import { Slide } from "@mui/material"

const Question = (props) => {
    const {value} = props
    return (
        <Slide direction="left" in={true}>
            <p>{value}</p>
        </Slide>
    )
}

export default Question