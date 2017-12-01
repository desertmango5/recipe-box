const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const recipeSchema = new Schema({
  title: {
    type: String,
    required: 'Please give your recipe a title',
  },
  ingredients: {
    type: String,
    required: 'Your recipe needs some ingredients',
  },
  directions: {
    type: String,
    required: 'Don\'t forget the cooking instructions!',
  },
});

// user-friendly error messages
recipeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Recipe', recipeSchema);
