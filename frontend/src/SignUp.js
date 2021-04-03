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
		} catch(e) {
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
			<div className='page-title' >Sign Up</div>
      <div className='input-text-label'>Username:</div>
  		<input className='input-text' type='text' 
				name='fname' 
				onChange={e => setUsername(e.target.value)}/> <br/>
			<div className='input-text-label'>Password:</div>
  		<input className='input-text' type='text'
				name='fname' 
				onChange={e => setPassword(e.target.value)}/>
			<div className='submit' onClick={e => clickSubmit()}>Sign Up</div>
			<div className='change-site'>Have an account?
				<span className='link' onClick={e => clickLogin()}> Log in here!</span>
			</div>
    </div>
  )
}

export default SignUp