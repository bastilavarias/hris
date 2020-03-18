const employeeService = require("./service");

module.exports = {
    create: async (req, res) => {
        console.log(req.body);
        res.send(req.body);
        // try {
        //     const result = await employeeService.create({});
        //     res.status(200).json(result);
        // } catch (errors) {
        //     console.log(errors);
        //     res.status(400).json(errors);
        // }
    }
};