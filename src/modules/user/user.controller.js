const userService = require('./user.service');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json({ users });
  } catch (err) {
    console.log("getUsers err>>>",err)
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    let newPassword = await bcrypt.hash(req.body.password, salt);
    req.body['password']=newPassword
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log("createUser err>>>",err)
  }
};