/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  questionText: { type: String },
  answer: { type: String },
  author: { type: String },
}, { timestamps: true })

module.exports = model('Question', questionSchema)
