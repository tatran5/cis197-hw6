const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session')
const path = require('path')
let bodyParser = require('body-parser');

console.log('running index.js');

const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {useNewUrlParser: true})
	.then( () => {
		console.log('Connected to mongo server.')
	}).catch((error) => {
		console.log(`Encountered error when connecting to mongo server: ${error}`)
	});

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: 'local-session',
		keys: ['wahoo'],
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
);

app.use('/account', AccountRouter);
app.use('/api', APIRouter)



// IMPORTANT: U NEED THIS
app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on 3000')
})