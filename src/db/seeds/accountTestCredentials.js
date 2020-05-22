const accountCredentials = [
  {
    username: "username",
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
