const { login } = require('./auth.service');

// exports.loginController = async (req, res) => {
//   const { email, password } = req.body;
//   const token = await login(email, password);

//   if (!token) return res.status(401).json({ message: 'Invalid Credentials' });
//   res.json({ token });
// };

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
  const token = await login(email, password);

  if (!token) return res.status(401).json({ message: 'Invalid Credentials' });
    return res.status(200).json({ token });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};