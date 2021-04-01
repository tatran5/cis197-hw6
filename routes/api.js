// This file should have routes to handle question updates

const Question = require('../models/question')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const express = require('express')
const router = express.Router()

// fetching all questions
router.get('/questions', (req, res, next) => {
	Question.find({})
		.then(questions => {
			res.status(200).send(questions);
		}).catch(e=>{
			e.statusCode = 500
			next(e)
		});
})

router.post('/questions/add', isAuthenticated, async (req, res, next) => {
	const { questionText } = req.body;

	try {
		if (!questionText) {
			const err = new Error('No text in the question!')
			err.statusCode = 400
			next(err)
		} 
		author = req.session.username

		const question = await (new Question({
			questionText: questionText,
			answer: null,
			author: req.session.username
		})).save()		

		res.status(200).send('A new question is created!')
	} catch (e) {
		e.statusCode = 500
		e.message = 'Something wrong with the database'
		next(e)
	}	
})

router.post('/questions/answer', isAuthenticated, async (req, res, next) => {
	const { questionId, answer }	= req.body;

	try {
		if (!questionId || !answer) {
			const err = new Error('No input question id or answer')
			err.statusCode = 400
			next(err)
		}

		const existingQuestion = await Question.findByIdAndUpdate(questionId, {answer: answer})
		if (!existingQuestion) {
			const err = new Error('No question with such id!');
			err.statusCode = 400
			next(err)
		}
		res.status(200)
	} catch (e) {
		e.statusCode = 500
		e.message = 'Something wrong with the database'
		next(e)
	}	

})

module.exports = router