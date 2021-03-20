// This file should have routes to handle login systen

const User = require('../models/user')

const express = require('express');
const { db } = require('../models/user');
const router = express.Router()

router.get('/', async (req, res) => {
	if (req.session.username === '') {
		res.send('Currently not logged in')
	} else {
		console.log(req.session.username)
		res.send('Currently logged in')		
	}
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body;

	if (req.session.username !== '') {
		res.status(400).send('Cannot sign up because still logged in')
		return;
	}
	
	User.findOne({ 'username' : username }, (err, user) => {
		if (err) {
			res.status(500).send(`Cannot check for existing user - something wrong happened on our end`)
		}
		if (user) {
			console.log(user)
			res.status(400).send(`A username like this already exists`)
		} else {
			const user = new User({
				username: username,
				password: password
			})
			user.save()
			.then(() => {
				res.status(200).send('A new account is created!')
			})
			.catch(e => {
				console.log(e)
				res.status(500).send('Cannot save new account - something wrong happened on our end')
			})
		}
	})
});

router.post('/login', isAuthenticated, (req, res) => {
	const { username, password } = req.body

	if (req.session.username !== '') {
		res.status(400).send('Cannot log in because still logged in');
		return;
	}

  User.findOne({ 'username' : username, 'password' : password }, (err, user) => {
    if (err) {
			console.log('ERRRORRR');
			res.status(500).send(`ERROR`)
		}
		if (user) {
			console.log(user)
      req.session.username = username
      req.session.password = password
      res.send(`logged in`)
    } else {
      res.send(`failed to log in - wrong username or password`)
    }
  })
})

router.post('/logout', (req, res) => {
	req.session.username = ''
  res.send('user logged out')
})

module.exports = router