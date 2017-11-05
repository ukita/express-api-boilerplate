const MongodbMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');

const mongod = new MongodbMemoryServer();

const app = require('../src/app');

module.exports = async (test) => {
  test.before(async () => {
    const mongoURI = await mongod.getConnectionString();
    mongoose.connect(mongoURI, { useMongoClient: true });
  });

  test.beforeEach(async (t) => {
    t.context.app = app;
  });

  test.after(async () => {
    mongoose.disconnect();
    mongod.stop();
  });
};
