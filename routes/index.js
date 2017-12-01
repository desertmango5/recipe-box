const express = require('express');

const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', recipeController.homePage);
router.get('/new-recipe', recipeController.newRecipe);

module.exports = router;
