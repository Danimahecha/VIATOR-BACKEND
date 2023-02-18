const { Router } = require("express");
const { getBoletos } = require("../controllers/boletos.controllers");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/users.controllers");

const router= Router()
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/boletos', getBoletos);