const accountModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeModel = require("../employee/model");
const {secretOrKey} = require("../../configuration");

const accountService = {
    generateDefaultPassword: (employeeNumber, lastName) => {
        return `${employeeNumber}_${lastName}`.toUpperCase();
    },

    encryptPassword: (plainTextPassword) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(plainTextPassword, salt);
    },

    comparePassword: async (plainTextPassword, hashedPassword) => {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    },

    login: async (username, password) => {
        const gotAccount = await accountModel.getSingleByUsername(username);
        let error = {};
        let token = "";
        if (Object.keys(gotAccount).length === 0) {
            error.username = "Username was not found.";
            return {
                token,
                error
            };
        }
        const isPasswordValid = await accountService.comparePassword(password, gotAccount.password);
        if (!isPasswordValid) {
            error.password = "Invalid password.";
            return {
                token,
                error
            };
        }
        const gotEmployee = await employeeModel.getSingleByAccountId(gotAccount.id);
        const jwtToken = jwt.sign(JSON.parse(JSON.stringify(gotEmployee)), secretOrKey);
        token = `Bearer ${jwtToken}`;
        return {
            token,
            error
        };
    }
};

module.exports = accountService;