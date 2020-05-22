const helperService = require("../helper/service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  ACCOUNT_TABLE_NAME,
  ACCOUNT_TABLE_USERNAME_COLUMN_NAME,
} = require("./type");

const accountService = {
  login: async (username, password) => {
    const error = {};
    const gotRawAccount = await helperService.getRaw(
      ACCOUNT_TABLE_NAME,
      ACCOUNT_TABLE_USERNAME_COLUMN_NAME,
      username.trim().toLowerCase()
    );
    if (Object.keys(gotRawAccount).length === 0) {
      error.username = "Account username was not found.";
      return {
        error,
      };
    }
    const isValidPassword = await accountService.compareHashedPassword(
      password,
      gotRawAccount.password
    );
    if (!isValidPassword) {
      error.password = "Invalid password.";
      return {
        error,
      };
    }
    const token = accountService.getToken({ username });
    return {
      error,
      message: "",
      token,
    };
  },

  compareHashedPassword: async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  },

  getToken: (payload) => {
    const signedjwt = jwt.sign(
      JSON.parse(JSON.stringify(payload)),
      process.env.AUTH_SECRET_OR_KEY
    );
    return `Bearer ${signedjwt}`;
  },
};

module.exports = accountService;
