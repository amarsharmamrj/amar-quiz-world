import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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
                                    <p
                                        className={correctOption === item ? 'correct-answer' : optionSelected === item && optionSelected !== correctOption ? 'wrong-answer' : 'no-icon'}
                                    >
                                        {/* <span>
                                            {
                                                (correctOption === item) && (
                                                    <CheckIcon className='mlr-one' />
                                                )
                                            }
                                            {
                                                (optionSelected === item && optionSelected !== correctOption) &&
                                                (
                                                    <CloseIcon className='mlr-one' />
                                                )
                                            }
                                        </span> */}

<span>
                                            {
                                                (correctOption === item) ? (
                                                    <CheckIcon className='mlr-one' />
                                                ):
                                                (optionSelected === item && optionSelected !== correctOption) ?
                                                (
                                                    <CloseIcon className='mlr-one' />
                                                ) : (
                                                    <CloseIcon className='mlr-one' sx={{color: 'white'}} />
                                                )
                                            }
                                        </span>
                                        {item}</p>
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