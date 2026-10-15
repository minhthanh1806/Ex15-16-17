const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Article title is required.'],
    minlength: [5, 'Title must be at least 5 characters.'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Article date is required.']
  },
  text: {
    type: String,
    required: [true, 'Article text is required.'],
    validate: {
      validator: function (v) {
        return v && v.length > 10;
      },
      message: 'Article text must be longer than 10 characters.'
    }
  },
  tags: {
    type: [String],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'There should be at least 1 tag.'
    }
  }
}, {
  timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

// Register 'Articles' alias if not already registered to handle ref compatibility
try {
  mongoose.model('Articles', articleSchema);
} catch (e) {}

module.exports = Article;
