import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QuestionDetail = ({ id, username }) => {
	const [question, setQuestion] = useState('')
	const [author, setAuthor] = useState('')
	const [answer, setAnswer] = useState('')
	const [inputAnswer, setInputAnswer] = useState('')

	const fetchDetails = async () => {
		try {
			const { data } = await axios.get(`/api/questions/${id}`)
			// console.log(data.status)
			console.log(data)
			setQuestion(data.questionText)
			setAuthor(data.author)
			if (answer) setAnswer(data.answer)
		} catch (e) {
			console.log(e)
			alert(`Something wrong happened to our system when we tried getting the details of this question :( Please try again later`)
		}
	}

	useEffect(() => {
		fetchDetails()
	}, [id, username])

	useEffect(() => {
		const intervalID = setInterval(fetchDetails, 2000)
		// return a clean-up function so that the repetition can be stopped
		// when the component is unmounted
		return () => clearInterval(intervalID)
	}, [id, username])

	return (
		<>
			<h2 className='question'>{question}</h2>
			<div className='detail-container'>
				<div className='author-label h6'>Author: </div>
				<p className='author'>{author}</p>
			</div>
			<div className='detail-container'>
				<div className='answer-label h6'>Answer:</div>
				<p className='answer'>{answer}</p>
			</div>
			{ username ?
				<div className="detail-container form-group">
					<label htmlFor="new-answer-text">Update answer:</label>
					<input type="text" className="form-control" id="new-question-text"
						placeholder="New answer..."
						onChange={e => setInputAnswer(e.target.value)} />
				</div>
				: <></>
			}
		</>
	)
}

export default QuestionDetail