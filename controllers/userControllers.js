const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");
const bcrypt = require("bcryptjs");
const { get } = require("lodash");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const validUser = await User.aggregate([
      {
        $match: {
          $or: [{ phone: phone }, { email: email }],
        },
      },
      {
        $limit: 2,
      },
    ]);

    if (validUser.length > 0) {
      return res.status(500).send("User Already Exists");
    }
    await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    res.json({ message: "Registered successfully" });
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    
    const isPasswordValid = await bcrypt.compare(
      password,
      get(findUser, "password", "") || "123"
    );
   
    if (findUser && isPasswordValid) {
      const data = findUser._id;
      const token = await jwt.sign({ userId: data }, "abcd1234");
      return res.status(200).send(token);
    } else if (!isPasswordValid) {
      return res.status(500).send({ message: "Incorrect password" });
    }else if(findUser){
      return res.status(500).send({ message: "User already exits" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser,
  getUser,
};
