const mongoose = require('mongoose');
const express = require('express');

mongoose.connect()

const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'


mongoose.connect(MONGO_URI, {useNewUrlParser: true});