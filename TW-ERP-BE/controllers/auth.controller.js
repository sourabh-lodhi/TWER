const bcrypt = require("bcryptjs");
const { Users, LoginHistory, Roles } = require("../models");
const { compareBcrypt, generateToken } = require("../helpers");
const { accessToken } = require("../config");
const messages = require("../constant");
const userService = require("../services");
const authServices = require("../services");

exports.signup = async (req, res) => {
  const { email, role } = req.body;
  try {
    const findUser = await userService.findUserByEmail(email);
    if (findUser) {
      return res.status(400).json({
        error: messages.auth.EMAIL_EXISTS,
      });
    }
    if (role === 1) {
      return res.status(400).json({
        error: messages.role.ROLE_IS_ALREADY_EXISTS,
      });
    }

    const user = await userService.createUser(req.body);
    if (!user) {
      return res.status(403).json({
        error: messages.errorMessages.DATA_NOT_FOUND,
      });
    }
    return res.status(200).json({
      message: messages.auth.REGISTER_SUCCESS,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) {
      return res.status(400).json({
        error: messages.errorMessages.DATA_NOT_FOUND,
      });
    }
    const passwordIsValid = compareBcrypt(req, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ error: messages.auth.INVALID_CREDENTIALS });
    }

    const authToken = generateToken();
    const createLoginHistory = await authServices.createLoginHistory(
      authToken,
      user.id
    );
    if (!createLoginHistory) {
      return res.status(400).json({
        error: messages.errorMessages.SOMETHING_WENT_WRONG,
      });
    }
    return res.status(200).json({
      message: messages.auth.LOGIN_SUCCESS,
      accessToken: authToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    let token = req.headers[accessToken];
    const user = await authServices.logOut(token);
    if (!user) {
      return res.status(400).json({ error: messages.auth.NOT_FOUND });
    }
    return res.status(200).json({ token: null });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req?.user) {
      return res.status(400).json({
        error: messages.errorMessages.DATA_NOT_FOUND,
      });
    }

    return res.status(200).json({
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
