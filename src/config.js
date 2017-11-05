require('dotenv').config();

const { env } = process;

module.exports = {
  server: {
    port: env.PORT || 3000,
  },
  mongodb: {
    uri: env.MONGODB_URI,
  },
};
