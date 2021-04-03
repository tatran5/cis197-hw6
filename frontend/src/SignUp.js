import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
const SignUp = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory();

	const clickLogin = () => {
		history.push("/login");
	}

	const clickSubmit = async () => {
		if (!username || !password) return alert('Username and password cannot be empty')
		try {
			await axios.post('/account/signup', { username, password })
		} catch (e) {
			const status = e.response.status
			if (status === 400) alert('Username already exists!')
			else alert('Something is wrong with our system :( Please try again later')
		}
		try {
			await axios.post('/account/login', { username, password })
			history.push('/')
		} catch (e) {
			alert('We have signed you up but cannot redirect you to home page because something is wrong with our system :( Please try logging in')
		}
	}

	return (
		<div className='SignUp'>
			<div className='navbar row '>
				<div className='page-title navbar-header navbar-brand	col'>Campuswire Lite </div>
			</div>
			<div className='h1 text-center' >Sign Up</div>
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
				<div className='change-site text-center'>Already have an account?
				<span className='link' onClick={e => clickLogin()}> Log in here!</span>
				</div>
			</div>
		</div>
  )
}

export default SignUp