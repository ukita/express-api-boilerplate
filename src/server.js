const mongoose = require('mongoose');
const app = require('./app');
const { server, mongodb } = require('./config');

mongoose.connect(mongodb.uri, { useMongoClient: true });
mongoose.set('debug', true);

mongoose.connection.once('open', () => {
  app.listen(server.port, () => {
    console.log(`Listening on port ${server.port}`);
  });
});
