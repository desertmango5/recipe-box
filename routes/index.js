const express = require('express');

const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', recipeController.homePage);

module.exports = router;
