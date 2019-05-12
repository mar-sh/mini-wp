const mongoose = require('mongoose');
const slug = require('slug');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty'],
  },
  slug: {
    type: String,
    default: 'published',
  },
  body: {
    type: String,
    required: [true, 'Content cannot be empty'],
  },
  author: String,
  url: String,
  tags: Schema.Types.Mixed,
  published: {
    type: String,
    default: 'false',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

articleSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;