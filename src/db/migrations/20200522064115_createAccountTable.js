exports.up = function (knex) {
  return knex.schema.createTable("account", function (table) {
    table.increments("id");
    table.string("username", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("account");
};
