import { Button, Grid } from "@mui/material"
import Categories from "../components/Categories"

const Home = () => {
    return (
        <div className="homepage-container">
            <Grid container md={12} className="homepage">
                <Grid item container xs={12} sm={12} md={8}>
                    <Categories />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home