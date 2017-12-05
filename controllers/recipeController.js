const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function(req, res, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype is not allowed' }, false);
    }
  }
}

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

exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.render('getRecipes',  { recipes, title: 'Recipes' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
}