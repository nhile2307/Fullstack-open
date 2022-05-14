const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true, minlength: 5 },
  author: { type: String, required: true, minlength: 3 },
  url: { type: String, required: true },
  likes: Number,
  comments: [String],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)
