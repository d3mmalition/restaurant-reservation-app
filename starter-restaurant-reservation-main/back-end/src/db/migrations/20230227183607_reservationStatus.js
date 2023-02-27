exports.up = function(knex) {
    return knex.schema.table("reservations", (table) => {
      return table.string("status").notNullable().defaultTo("booked");
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table("reservations", (table) => {
      return table.dropColumn("status");
    });
  };
  