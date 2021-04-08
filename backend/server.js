const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const path = require('path');
const APIRouter = require('./routes/api')
const AccountRouter = require('./routes/account')

const app = express()
const MONGO_URI = 'mongodb://localhost:27017/test-2'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cookieSession({
  name: 'session',
  keys: ['backInThe90s'],
  // maxAge: 5000 // 5 seconds
}))

// INTEGRATION
app.use(express.static('dist'))

app.use(express.json())

app.use('/account', AccountRouter)
app.use('/api', APIRouter)


// INTEGRATION
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// error handler
app.use((err, req, res, next) => {
  if (err) {
    // eslint-disable-next-line no-param-reassign
    err.stack = ''
    next(err)
  }
  res.status(200)
})

app.listen(3000, () => {
  console.log('mongoDB is connected')
  console.log('listening on 3000')
})