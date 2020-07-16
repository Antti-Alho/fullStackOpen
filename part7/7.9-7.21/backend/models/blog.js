const mongoose = require('mongoose')
const Comment = require('./comment')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  author:{
    type: String,
    minlength: 3,
    required: true,
  },
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment
    }
  ],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('blog', blogSchema)