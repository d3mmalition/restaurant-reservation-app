/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://aperirap:bFRblXzLg9J7yM6NsgieE8NS6_1ebwgu@isilo.db.elephantsql.com/aperirap",
  // DATABASE_URL_DEVELOPMENT = "postgres://jsohxhjb:hIxLiN0jdiQ3XdsprMDxMTTLUa5565Mn@isilo.db.elephantsql.com/jsohxhjb",
  // DATABASE_URL_TEST = "postgres://fzhxzknr:ql9-VDrlb3C0BopwQI6-WZJMA6OJg3u_@isilo.db.elephantsql.com/fzhxzknr",
  // DATABASE_URL_PREVIEW = "postgres://xiorpslq:t2KGSRKzzXvxci4yAk5Da90yHVhFo2gQ@isilo.db.elephantsql.com/xiorpslq",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
