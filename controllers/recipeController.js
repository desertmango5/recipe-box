const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.newRecipe = (req, res) => {
  res.render('newRecipe', { title: 'New Recipe' });
};

exports.playground = (req, res) => {
  res.render('playground', { title: 'Pug Playground ' });
  // res.send('Holy crapolicious, it works!');
  // res.json({ name: 'michael' });
  // res.json(req.query);  // sends all query data as JSON
};

exports.createNewRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  console.log('Your recipe was saved 😎');
  res.redirect('/');
};
