import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const LogIn = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory();


	const clickSignUp = () => {
		history.push("/signup");
	}

	const clickSubmit = async () => {
		if (!username || !password) return alert('Username and password cannot be empty')
		try {
			await axios.post('/account/login', { username, password })
			history.push('/')
		} catch (e) {
			const status = e.response.status
			if (status === 400) return alert('An account is already logged in. You need to log out first from home page')
			else return alert('Something is wrong with our system :( Please try again later')
		}
	}

	return (
		<div className='LogIn'>
		<div className='navbar row '>
			<div className='page-title navbar-header navbar-brand	col'>Campuswire Lite </div>
		</div>
		<div className='h1 text-center' >Log In</div>
		<div className='input'>
			<div className="form-group">
				<label htmlFor="input-username">Username</label>
				<input type="text" className="form-control" id="input-username"
					placeholder="Enter username..."
					onChange={e => setUsername(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="input-username">Password</label>
				<input type="password" className="form-control" id="input-username"
					placeholder="Enter password..."
					onChange={e => setPassword(e.target.value)} />
			</div>
			<button type="button" className="btn btn-info"
				data-dismiss="modal" onClick={_ => clickSubmit()}>Log in</button>
			<div className='change-site text-center'>Don't have an account?
				<span className='link' onClick={e => clickSignUp()}> Sign up here!</span>
			</div>
		</div>
	</div>
	)
}

export default LogIn