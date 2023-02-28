const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

const VALID_FIELDS = ["table_name", "capacity"];

function isValidTable(req, res, next) {
  const table = req.body.data;
  if (!table) {
    return next({ status: 400, message: "Must have data property" });
  }

  for (const field of VALID_FIELDS) {
    if (!table[field]) {
      return next({ status: 400, message: `Must have ${field} property.` });
    }
  }

  if (typeof table.capacity !== "number" || table.capacity < 1) {
    return next({
      status: 400,
      message: "Capacity must be a number greater than 0",
    });
  }

  if (table.table_name.length < 2) {
    return next({
      status: 400,
      message: "Table name must be at least two characters long.",
    });
  }

  next();
}


async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res, next) {
  const table = req.body.data;
  const newTable = await service.create(table);
  table.reservation_id = newTable.reservation_id;
  table.table_id = newTable.table_id;
  if (!table.reservation_id || !table.table_id) {
    return next({
      status: 500,
      message: "An error occurred while creating the table",
    });
  }
  res.status(201).json({ data: table });
}

async function finish(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);

  if (!table) {
    return next({
      status: 404,
      message: `Table ${table_id} not found`,
    });
  }

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: `Table ${table.table_id} is not currently occupied.`,
    });
  }

  const reservation = await reservationService.read(table.reservation_id);
  await reservationService.update(table.reservation_id, { status: "finished" });
  await service.update(table.table_id, { reservation_id: null });

  res.status(200).json({ data: { status: "finished" } });
}



module.exports = {
  create: [asyncErrorBoundary(isValidTable), asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(isValidTable),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
  finish: [asyncErrorBoundary(finish)],
};