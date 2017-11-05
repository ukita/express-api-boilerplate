const setup = require('../setup');
const test = require('ava');
const request = require('supertest');
const User = require('../../src/models/User');

setup(test);

test.beforeEach(async () => {
  const user = new User({ name: 'John Doe' });
  await user.save();
});

test.serial('list all users', async (t) => {
  const { app } = t.context;
  const response = await request(app).get('/users');

  t.is(response.statusCode, 200);
  t.is(response.body.length, await User.find().count());
});

test.serial('get user by id', async (t) => {
  const { app } = t.context;
  const user = await User.findOne();
  const response = await request(app).get(`/users/${user.id}`);

  t.is(response.statusCode, 200);
  t.is(response.body.name, user.name);
});

test.serial('create an user', async (t) => {
  const { app } = t.context;
  const response = await request(app)
    .post('/users')
    .send({ name: 'Joana Doe' });

  t.is(response.statusCode, 201);
  t.is(response.body.name, 'Joana Doe');
});

test.serial('update an user', async (t) => {
  const { app } = t.context;
  const user = await User.findOne();
  const response = await request(app)
    .put(`/users/${user.id}`)
    .send({ name: 'Joana Doe' });

  t.is(response.statusCode, 200);
  t.not(response.body.name, user.name);
});

test.serial('delete an user', async (t) => {
  const { app } = t.context;
  const user = await User.create({ name: 'Bruno Ukita' });
  const response = await request(app).delete(`/users/${user.id}`);

  t.is(response.statusCode, 204);
  t.is(await User.findById(user.id), null);
});
