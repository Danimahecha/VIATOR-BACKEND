const { Router } = require('express');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");
const {getUser, getUsers, createUser, updateUser, deleteUser} = require('../controllers/users.controllers.js');
const { get_airline, get_id_airline, create_airline, update_airline, addAirport} = require('../controllers/airlines.controllers.js');
const {getAirports, createAirport, updateAirport, deleteAirport, getAirport, addAirline} = require('../controllers/airports.controllers.js');
const {getFlights, getFlight, createFlight, updateFlight, deleteFlight} = require('../controllers/flights.controllers.js');
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require('../controllers/tickets.controllers.js');
const {postLogin, postRegister, putSetInfo} = require('../controllers/login.controllers.js');
const {getAirportsByInput} = require('../controllers/searchs.controllers.js');
const getRecommendedFlights = require('../controllers/flights.recomend.js');

const router = Router();

//Users
router.get('/getUsers', getUsers);
router.post('/createUser', createUser);
router.put('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);
router.get('/getUser/:id',getUser );

//Airports
router.get('/getAirports', getAirports);
router.post('/createAirport', createAirport);
router.put('/updateAirport/:id', updateAirport);
router.delete('/deleteAirport/:id', deleteAirport);
router.get('/getAirport/:id', getAirport);
router.post('/addAirline', addAirline);

//Airlines
router.get('/api/airlines', get_airline)
router.post('/api/airlines', create_airline)
router.put('/api/airlines/:id', update_airline)
//router.delete('/api/airlines/:id, delete_airline)
router.get('/api/airlines/:id', get_id_airline)
router.post('/api/addAirport/:id', addAirport)

//Flights
router.get('/api/flights', getFlights);
router.post('/api/flights', createFlight);
router.put('/api/flights/:id',updateFlight);
router.delete('/api/flights/:id',deleteFlight);
router.get('/api/flights/:id',getFlight );

//recommended Flights
router.get('/api/recommended', getRecommendedFlights)

//Tickets
router.get('/api/tickets', getTickets);
router.post('/api/tickets', createTicket);
router.put('/api/tickets/:id', updateTicket);
router.delete('/api/tickets/:id', deleteTicket);
router.get('/api/tickets/:id', getTicket);

//Login - Register
router.post('/register',jwtCheck, postRegister)
router.post('/login',jwtCheck, postLogin)
router.put('/setInfo',jwtCheck, putSetInfo)

//Searchs
router.get('/getAirportsByInput/:input', getAirportsByInput);

//Profile
module.exports = router;