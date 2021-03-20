// This file should have routes to handle login systen

const User = require('../models/user')

const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { username } = req.session
  console.log(req.session)

  res.send(`${username} is logged in`)
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
		if (err) {
			res.status(500).send(`Cannot check for existing user - something wrong happened on our end`)
		}
    if (user) {
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

router.post('/login', (req, res) => {
	
})

router.post('/logout', (req, res) => {
	
})

module.exports = router