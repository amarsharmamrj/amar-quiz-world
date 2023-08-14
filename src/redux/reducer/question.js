const initialState = null

const question = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_QUESTIONS': {
            state = {
                allQuestions: action.payload
            }
            return state
        }

        case 'SELECT_OPTION': {
            state = {
                allQuestions: state.allQuestions.map((item) => {
                    if (item.id === action.payload.index) {
                        item.optionSelected = action.payload.option
                        item.attempted = true
                    }
                    return item
                })
            }
            return state
        }

        default: {
            return state
        }
    }
}

export default question