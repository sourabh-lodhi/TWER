const { LoginHistory } = require("../models");

class AuthService {
  createLoginHistory = async (authToken, id) => {
    try {
      return await LoginHistory.create({
        token: authToken,
        user: id,
      });
    } catch (error) {
      return error;
    }
  };

  logOut = async (token) => {
    try {
      return await LoginHistory.findOneAndUpdate(
        { token },
        { token: null },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  };

  findLoginHistory = async (token) => {
    try {
      return await LoginHistory.findOne({ token });
    } catch (error) {
      return error;
    }
  };
}

const authServices = new AuthService();

module.exports = authServices;
