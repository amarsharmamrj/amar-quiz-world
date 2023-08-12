import { Grid, Typography } from "@mui/material"
import Category from "./Category"
import { useNavigate } from "react-router-dom"

const Categories = () => {
    const navigate = useNavigate()

    const categoryData = [
        {
            title: 'Any Category',
            value: '0',
            bg: '#FF6D60',
            color: 'white',
            image: 'Any Category'
        },
        {
            title: 'General Knowledge',
            value: '9',
            bg: '#974EC3',
            color: 'white',
            image: 'General Knowledge'
        },
        {
            title: 'Books',
            value: '10',
            bg: '#22A699',
            color: 'white',
            image: 'Books'
        },
        {
            title: 'Film',
            value: '11',
            bg: '#EA1179',
            color: 'white',
            image: 'Film'
        },
        {
            title: 'Music',
            value: '12',
            bg: '#4477CE',
            color: 'white',
            image: 'Music'
        },
        {
            title: 'Musicals & Theatres',
            value: '13',
            bg: '#7149C6',
            color: 'white',
            image: 'Musicals & Theatres'
        },
        {
            title: 'Television',
            value: '14',
            bg: '#f57292',
            color: 'white',
            image: 'Television'
        },
        {
            title: 'Video games',
            value: '15',
            bg: '#EA5455',
            color: 'white',
            image: 'Video games'
        },
        {
            title: 'Board games',
            value: '16',
            bg: '#7A316F',
            color: 'white',
            image: 'Board games'
        },
        {
            title: 'Science and nature',
            value: '17',
            bg: '#557A46',
            color: 'white',
            image: 'Science and nature'
        },
        {
            title: 'Computers',
            value: '18',
            bg: '#4E4FEB',
            color: 'white',
            image: 'Computers'
        },
        {
            title: 'Mathematics',
            value: '19',
            bg: '#898121',
            color: 'white',
            image: 'Mathematics'
        },
        {
            title: 'Sports',
            value: '21',
            bg: '#FF8551',
            color: 'white',
            image: 'Sports'
        },
        {
            title: 'Geography',
            value: '22',
            bg: '#1F6E8C',
            color: 'white',
            image: 'Geography'
        },
        {
            title: 'History',
            value: '23',
            bg: '#4942E4',
            color: 'white',
            image: 'History'
        },
        {
            title: 'Politics',
            value: '24',
            bg: '#116A7B',
            color: 'white',
            image: 'Politics'
        }, {
            title: 'Art',
            value: '25',
            bg: '#FF7B54',
            color: 'white',
            image: 'Art'
        },
        {
            title: 'Celebraties',
            value: '26',
            bg: '#4E31AA',
            color: 'white',
            image: 'Celebraties'
        },
        {
            title: 'Animal',
            value: '27',
            bg: '#B04759',
            color: 'white',
            image: 'Animal'
        },
        {
            title: 'Vehicles',
            value: '28',
            bg: '#19A7CE',
            color: 'white',
            image: 'Vehicles'
        },
        {
            title: 'Comics',
            value: '29',
            bg: '#8B1874',
            color: 'white',
            image: 'Comics'
        },
        {
            title: 'Gadgets',
            value: '30',
            bg: '#FD8A8A',
            color: 'white',
            image: 'Gadgets'
        },
        {
            title: 'Cartoon & Animations',
            value: '32',
            bg: '#19A8CE',
            color: 'white',
            image: 'Cartoon & Animations'
        },
    ]

    const handleCategory = (e, bg, title) => {
        const categoryId = e.currentTarget.id
        let uri = ''
        if(categoryId == 0) uri = `https://opentdb.com/api.php?amount=10`
        else uri = `https://opentdb.com/api.php?amount=10&category=${categoryId}`
        console.log("handleCategory:", uri)

        console.log('@# bg:', bg)
        const bgColor = bg.substring(1)
        navigate(`/quiz/${bgColor}/${categoryId}/${title}`)
    }

    return (
        <Grid item container md={12}>
            <Grid item md={12}>
                <h2 className="category-heading color-one ml-one">Choose a category</h2>
            </Grid>
            <Grid item container md={12}>
                {
                    categoryData.map((category) => <Category category={category} handleCategory={handleCategory} />)
                }
            </Grid>
        </Grid>
    )
}

export default Categories