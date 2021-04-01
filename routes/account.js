// This file should have routes to handle login systen

const User = require('../models/user')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const express = require('express');
const router = express.Router()

router.get('/', isAuthenticated, async (req, res) => {
	res.send('Currently logged in')
})

router.post('/signup', async (req, res, next) => {
	const { username, password } = req.body;

	if (req.session.userId) {
		const err = new Error('Cannot sign up because still logged in')
		err.statusCode = 400
		next(err)
	}

	try {
		let user = await User.findOne({ 'username': username })

		if (user) {
			const err = new Error (`A username like this already exists`)
			err.statusCode = 400
			next(err)
		}

		user = await (new User({
			username: username,
			password: password
		})).save()

		res.status(200).send('A new account is created!')
	} catch (e) {
		next(e)
	}
});

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body

	try {
		if (req.session.userId) {
			let err = new Error('Cannot log in because still logged in');
			err.statusCode = 400
			next(err)
		}

		const user = await User.findOne({ 'username': username, 'password': password })
		if (!user) {
			let err = new Error('Failed to log in - wrong username or password');
			err.statusCode = 400
			next(err)
		}

		req.session.userId = user._id
		res.status(200).send(`Succesfully logged in`)

	} catch (e) {
		e.statusCode = 500
		e.message = 'Something wrong with the database'
		next(e)
	}
})

router.post('/logout', isAuthenticated, (req, res, next) => {
	req.session.userId = null
	res.status(200).send('user logged out')
})

module.exports = router