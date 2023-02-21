const { Router } = require('express');
const Route = Router()
const{getFlight, getFlights, updateFlight, createFlight, deleteFligth}= require('../controllers/flights.controllers')
Route.get('/', getFlights);
Route.get('/:id', getFlight);
Route.post('/', createFlight);
Route.put('/:id', updateFlight);
Route.delete('/:id', deleteFligth);