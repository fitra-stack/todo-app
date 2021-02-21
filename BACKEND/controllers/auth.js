require("dotenv").config();

const { User } = require("../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_TOKEN } = process.env;

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new Error(
        "User with this username already exist. Please use other username."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register user.",
    });
  } catch (error) {                                            
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User with this username not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password not valid.");
    }

    const accessToken = jwt.sign({ userId: user.id }, SECRET_TOKEN, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Success login.",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};
