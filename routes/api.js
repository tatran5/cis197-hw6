// This file should have routes to handle question updates

const Question = require('../models/question')

const express = require('express')
const router = express.Router()

// fetching all questions
router.get('/questions', (req, res) => {
	Question.find({})
		.then(questions => {
			res.send(questions);
		}).catch(e=>{
			console.log(e);
			res.status(500).send('Something wrong happened on the backend')
		});
})

router.post('/add', isAuthenticated, (req, res) => {
	const { questionText } = req.body;

	// if (req.session.username === '') {
	// 	res.status(400).send('Cannot ask question because has not logged in')
	// 	return;
	// }
	author = req.session.username ? req.session.username : 'anonymouse'

	const question = new Question({
		questionText: questionText,
		answer: null,
		author: req.session.username
	})
	
	question.save()
		.then(() => {
			res.status(200).send('A new question is created!')
		})
		.catch(e => {
			console.log(e)
			res.status(500).send('Cannot add a new quesstion  - something wrong happened on our end')
		})
})

router.post('/answer', isAuthenticated, (req, res) => {
	const { questionId, answer }	= req.body;
	
	Question.findOne({'_id': questionId})
		.then(question => {
			if (!question) {
				res.status(400).send('No question with such id!');
				return;
			}
			question.answer = answer;
			question.save()
				.then(() => res.status(200).send('The question is updated to have an answer'))
				.catch(e => res.status(500).send('Cannot add the answer - something wrong happened on our end'));
		})
		.catch(e => {res.status(400).send('Invalid id format!'); console.log(e)})
})

module.exports = router