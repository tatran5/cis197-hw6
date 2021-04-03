import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import QuestionDetail from './questionDetail'

const Home = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [username, setUsername] = useState('')
	const [questions, setQuestions] = useState([])
	const [newQuestion, setNewQuestion] = useState('')
	const [questionDetail, setQuestionDetail] = useState(<></>)
	const history = useHistory()

	const clickLogOut = async () => {
		try {
			await axios.post('/account/logout')
			history.push('/login')
		} catch (e) {
			console.log(e)
			alert('Something is wrong with our system so we cannot log you out :( Please try again later')
		}
	}

	const clickLogIn = async () => {
		history.push('/login')
	}

	const clickQuestion = async (id) => {
		console.log(id)
		setQuestionDetail(<QuestionDetail id={id} username={username}/>)
	}

	const createQuestion = async () => {
		if (!newQuestion) return alert('Your question cannot be empty')
		try {
			await axios.post('/api/questions/add', { questionText: newQuestion, author: username })
		} catch (e) {
			console.log(e)
			alert('Something is wrong with our system so we cannot add your question :( Please try again later')
		}
	}

	const fetchQuestions = async() => {
		try {
			// Get list of questions
			const { data } = await axios.get('/api/questions')
			setQuestions(data)
		} catch (e) {
			alert('Something happened to our system when we tried to get all the questions :( Please try again later')
		}	
	}

	const fetchUserInfo = async () => {
		try {
			// Get user info
			const { data } = await axios.get('/account')
			setUsername(data)
			setLoggedIn(true)
		} catch (e) {
			console.log(e)
			setLoggedIn(false)
		}
	}

	// Fetch all questions
	useEffect(async () => {
		
		const intervalID = setInterval( fetchQuestions, 2000)

		return () => clearInterval(intervalID)
	}, [])

	// Fetch user info
	useEffect(() => {
		fetchQuestions()
		fetchUserInfo()
	}, [])

	return (
		<>
			<div className='navbar row'>
				<div className='page-title navbar-header navbar-brand	col'>Campuswire Lite </div>
				{loggedIn ?
					<>
						<div className='name col-0'>Hi {username}</div>
						<div className='log-out col-0' onClick={e => clickLogOut()} >Log out</div>
					</>
					:
					<div className='col'>You have not logged in yet. Click
						<span className='link' onClick={e => clickLogIn()}> here </span>
						to do so
					</div>
				}

			</div>
			<div className='row'>
				<div className='question-list col-4'>
					{/* ADD A QUESTION BUTTON AND POP UP - START */}
					<button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">Add a question</button>

					{/* <!-- Modal --> */}
					<div className="modal fade" id="myModal" role="dialog">
						<div className="modal-dialog">

							{/* <!-- Modal content--> */}
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close btn-sm" data-dismiss="modal">&times;</button>
								</div>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="new-question-text">Add question</label>
										<input type="text" className="form-control" id="new-question-text"
											placeholder="New question..."
											onChange={e => setNewQuestion(e.target.value)} />
									</div>
									<button type="button" className="btn btn-info"
										data-dismiss="modal" onClick={_ => createQuestion()}>Submit</button>
								</div>
							</div>
						</div>
					</div>
					{/* ADD A QUESTION BUTTON AND POP UP - END */}

					{questions.map((q, i) =>
						<div className='question-preview'
							key={i}
							id={q._id}
							onClick={e => clickQuestion(q._id)}>{q.questionText}</div>)
					}
				</div>
				<div className='question-detail col'>
					{questionDetail}
				</div>
			</div>
		</>
	)
}

export default Home