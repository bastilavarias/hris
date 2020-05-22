const accountCredentials = [
  {
    username: "encoder",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "faculty",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "personnel",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "dean",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "personnel_head",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "hr",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "hr_head",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "accountant",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "vpaa",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },

  {
    username: "developer",
    password: "$2y$10$9gFehchpiIJCStL/zjS8qO2iVqlvynpYMN/Ji0nOQd4Yp74wcB4pG",
  },
];

exports.seed = function (knex) {
  return knex("account")
    .del()
    .then(function () {
      return knex("account").insert(accountCredentials);
    });
};
