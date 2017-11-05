const User = require('../models/User');

module.exports.index = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    return res.send(users);
  } catch (error) {
    return res.status(412).send(error);
  }
};

module.exports.create = async (req, res) => {
  try {
    const userParams = req.body;
    const user = await User.create(userParams);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(412).send(error);
  }
};

module.exports.show = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (user) return res.send(user);

    return res.sendStatus(404);
  } catch (error) {
    return res.status(412).send(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { userId } = req.params;
    const userParams = req.body;

    const user = await User.findByIdAndUpdate(userId, userParams, { new: true });

    if (user) return res.send(user);

    return res.sendStatus(404);
  } catch (error) {
    return res.status(412).send(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndRemove(userId);

    if (user) return res.sendStatus(204);

    return res.sendStatus(404);
  } catch (error) {
    return res.status(412).send(error);
  }
};
