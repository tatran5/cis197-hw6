import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const LogIn = () => {
	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')
	const history = useHistory();

	
	const clickSignUp = () => {
		history.push("/signup");
	}

	const clickSubmit = async () => {
		if (!username || !password) return alert('Username and password cannot be empty')
		try {
			await axios.post('/account/login', { username, password })
			history.push('/')
		} catch(e) {
			const status = e.response.status
			if (status === 400) return alert('An account is already logged in. You need to log out first from home page')
			else return alert('Something is wrong with our system :( Please try again later')
		}
	}

	return (
    <div className='LogIn'>
			<div className='page-title' >Log In</div>
      <div className='input-text-label'>Username:</div>
  		<input className='input-text' type='text' 
				name='fname' 
				onChange={e => setUsername(e.target.value)}/> <br/>
			<div className='input-text-label'>Password:</div>
  		<input className='input-text' type='text'
				name='fname' 
				onChange={e => setPassword(e.target.value)}/>
			<div className='submit' onClick={e => clickSubmit()}>Log In</div>
			<div className='change-site'>Don't have an account?
				<span className='link' onClick={e => clickSignUp()}> Sign up here!</span>
			</div>
    </div>
  )
}

export default LogIn