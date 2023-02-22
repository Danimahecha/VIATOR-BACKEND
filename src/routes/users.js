const { Router } = require("express");
const { getBoletos } = require("../controllers/boletos.controllers");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/users.controllers");

const Route= Router()
Route.get('/', getUsers);
Route.get('/:id', getUser);
Route.post('/', createUser);
Route.put('/:id', updateUser);
Route.delete('/:id', deleteUser);
Route.get('/boletos', getBoletos);
module.exports= Route