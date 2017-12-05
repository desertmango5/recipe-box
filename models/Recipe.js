const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const Schema = mongoose.Schema;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const recipeSchema = new Schema({
  title: {
    type: String,
    required: 'Please give your recipe a title',
  },
  slug: String,
  ingredients: {
    type: String,
    required: 'Your recipe needs some ingredients',
  },
  directions: {
    type: String,
    required: 'Don\'t forget the cooking instructions!',
  },
  categories: [String],
  photo: String,
});

// autogenerate recipe slug from title
recipeSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    next(); // skip this
    return; // stop this function
  }
  this.slug = slug(this.title);
  next();
  // TODO make sure all slugs are unique
});

// user-friendly error messages
recipeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Recipe', recipeSchema);
