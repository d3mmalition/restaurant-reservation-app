/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://ytywpbfn:k4s4pPY9Q78RtxtEEMnIUzKN4xzaD3yc@suleiman.db.elephantsql.com/ytywpbfn",
  DATABASE_URL_DEVELOPMENT = "postgres://ksrwmsjl:iqOR0GgHwE0eXb6yMOBcpgX_viO9BaO7@suleiman.db.elephantsql.com/ksrwmsjl",
  DATABASE_URL_TEST = "postgres://tidssdiu:rkQD5S02Y1r2zsLFfTu5qp-Bgb5Ho81v@suleiman.db.elephantsql.com/tidssdiu",
  DATABASE_URL_PREVIEW = "postgres://stvpbcvz:c796ZmRjE5JwoCiWJnDUKGIxdmXrGu8U@suleiman.db.elephantsql.com/stvpbcvz",
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
