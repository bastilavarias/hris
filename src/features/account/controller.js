const accountService = require("./service");

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const result = await accountService.login(username, password);
            res.status(200).json(result);
        } catch (errors) {
            console.log(errors);
            res.status(400).json(errors);
        }

    }
};