const User = require("../models/user.model");
// const fakeEncoder=require("../utils/encode.token");

const register = (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  user.save();
  res.status(201).json({ message: "User created successfully" });
};

 const login =  async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  res.status(200).json({ message: "Login successful", user });
};


module.exports = { register, login };