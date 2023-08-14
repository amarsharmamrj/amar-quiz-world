export const addQuestions = (questions) => {
    return {
        type: 'ADD_QUESTIONS',
        payload: questions
    }
}

export const selectOption = (index, option) => {
    return {
        type: 'SELECT_OPTION',
        payload: { index, option }
    }
}