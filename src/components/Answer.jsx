const Answer = (props) => {
    const { id, attempted, correctOption, optionSelected, options, question } = props.answer
    return (
        <>
            <div className="answer">
                <h2>{question}</h2>
                {
                    options && (
                        options.length > 0 && (
                            options.map((item) => {
                                return (
                                    <p className={correctOption === item ? 'correct-answer' : 'wrong-answer'}>{item}</p>
                                )
                            })
                        )
                    )
                }
            </div>
        </>
    )
}

export default Answer