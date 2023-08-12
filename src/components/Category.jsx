import { Grid } from "@mui/material"

const Category = (props) => {
    const { title, bg, color, image, value } = props.category
    const { handleCategory } = props

    return (
        <Grid item xs={12} sm={6} md={4}>
            <div
                id={value}
                className="category-card"
                style={{ backgroundColor: bg, color: color }}
                onClick={(e) => handleCategory(e, bg, title)}
            >
                <h2>{title}</h2>
                <img src={`/images/category/${image}.svg`} title={title} />
            </div>
        </Grid>
    )
}

export default Category