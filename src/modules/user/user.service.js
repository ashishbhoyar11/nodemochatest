const User = require('./../auth/auth.model');

exports.getAll = async () => {
    return User.find();
};


exports.create = async (payload) => {
    const user = new User(payload);
    await user.save();
    return user;
};