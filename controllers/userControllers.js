const User = require("../model/user");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");
const bcrypt = require("bcryptjs");
const { get, isEmpty } = require("lodash");
const otplib = require("otplib");
const {sendPasswordResetMail}=require("../middleware/sendMailVerification")

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
      const token = await jwt.sign({ userId: data }, process.env.SECRET_KEY);
      return res.status(200).send(token);
    }else if(findUser===null){
      return res.status(500).send({ message: "User does not exits" });
    }else if (!isPasswordValid) {
      return res.status(500).send({ message: "Incorrect password" });
    }
  } catch (e) {
    console.log(e);
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmail = await User.findOne({ email });


    if (isEmpty(isEmail)) {
      return res.status(404).send({ message: "User not found" });
    } else {
      const secret = otplib.authenticator.generateSecret();
      const otp = otplib.authenticator.generate(
        get(isEmail, "email", ""),
        "Ecommerce",
        secret
      );
      sendPasswordResetMail(email, otp, secret);
      if (otp) {
        return res.status(200).send({ data: otp });
      } else {
        return res.status(200).send({ message: "Otp verification failed..." });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await User.find({ email });
    const isPasswordValid = await bcrypt.compare(password, isEmail[0].password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   

    if (isPasswordValid) {
      return res.status(404).send({ message: "Try a different password" });
    }

    if (!isEmail.length) {
      return res.status(404).send({ message: "Email not found" });
    }

    await User.findByIdAndUpdate(isEmail[0]._id, {
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (e) {}
};

module.exports = {
  createUser,
  getUser,
  forgotPassword,
  passwordReset
};
