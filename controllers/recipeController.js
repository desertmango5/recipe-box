exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.newRecipe = (req, res) => {
  res.render('newRecipe', { title: 'New Recipe' });
};

exports.createRecipe = async (req, res) => {
  res.json;
};
