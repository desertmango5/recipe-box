const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise; // use ES6 promises
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`⚠️  WARNING ⚠️  ${err.message} ⚠️`);
});
db.once('open', () => {
  console.log('MongoDB is open for business 💯');
});

// import database models
require('./models/Recipe');

const app = require('./app');

// node.js server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
