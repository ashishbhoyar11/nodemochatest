const express = require('express');
require('dotenv').config();
const authRoutes = require('./modules/auth/auth.route');
const userRoutes = require('./modules/user/user.route');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;