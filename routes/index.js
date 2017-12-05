const express = require('express');

const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { catchErrors } = require('../handlers/errorHandlers');

// router.get('/', recipeController.homePage);
router.get('/new-recipe', recipeController.newRecipe);
router.get('/playground', recipeController.playground);
router.get('/', catchErrors(recipeController.getRecipes));

router.post('/new-recipe', catchErrors(recipeController.createNewRecipe));

// test routes for reminders
router.get('/test/:first/:last/:age/:country', (req, res) => {
  // params will pull in the :name variable --> returns name: "michael", etc
  res.send(req.params);
});

module.exports = router;
