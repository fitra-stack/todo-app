require("dotenv").config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { SECRET_TOKEN } = process.env;

const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
    } = req.body;
    console.log(req)
    const user = await User.findOne({
      where: {
        username,
      }
    });

    // reject jika username sudah ada
    if(user) {
      throw new Error('User with this username already exist. Please use other username');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // save user to database
    await User.create({
      username,
      password: hashedPassword
    })
    return res.status(201).send({
      status: 'success',
      code: 201,
      message: 'Success register user'
    });
  } catch (err) {
    return next(err);
  }
}

// const login = async (req, res, next) => {
//   try {
//     // handle login
//     /**
//      * 1. cari user di database
//      * 2. jika user tidak ditemukan throw error 'User not found'
//      * 3. jika user ditemukan, validate password
//      * 4. jika password tidak sama, throw error 'password missmatch'
//      * 5. jika password sama, generate jsonwebtoken
//      * 6. return data jsonwebtoken
//      */
//   } catch(err) {
//     return next(err)
//   }
// }
const login = async (req, res, next) => {
  try {
    // handle login
    /**
     * 1. cari user di database
     * 2. jika user tidak ditemukan throw error 'User not found'
     * 3. jika user ditemukan, validate password
     * 4. jika password tidak sama, throw error 'password missmatch'
     * 5. jika password sama, generate jsonwebtoken
     * 6. return data jsonwebtoken
     */
    const {
      username,
      password,
    } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
      raw: true,
    });
    // reject jika username sudah ada
    if(!user) {
      throw new Error('User tidak ditemukan');
    }
    const match = bcrypt.compareSync(password, user.password);
    if(!match) throw new Error('password not valid');
    const accessToken = jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '1h' });
    user.access_token = accessToken;
    delete user.password;
    return res.status(200).send({
      code: 200,
      message: 'ok',
      data: user
    })
  } catch(err) {
    console.log(err);
    return next(err)
  }
}

module.exports = {
  register,
  login,
}