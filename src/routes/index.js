const { Router } = require('express');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");
const {getUser, getUsers, createUser, updateUser, deleteUser, addFlight, getUserFlights, addTicket, getUserTickets} = require('../controllers/users.controllers.js');
const { get_airline, get_id_airline, create_airline, update_airline, addAirport} = require('../controllers/airlines.controllers.js');
const {getAirports, createAirport, updateAirport, deleteAirport, getAirport, addAirline, getAirportBycountry} = require('../controllers/airports.controllers.js');
const {getFlights, getFlight, createFlight, updateFlight, deleteFlight} = require('../controllers/flights.controllers.js');
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require('../controllers/tickets.controllers.js');
const {postLogin, postRegister, getIsRegistered, putSetInfo} = require('../controllers/login.controllers.js');
const {getAirportsByInput, getFlightsByQuery} = require('../controllers/searchs.controllers.js');
const getRecommendedFlights = require('../controllers/flights.recomend.js');
const {getFlightsScale} =require('../controllers/flightScale');
const router = Router();

//Users
router.get('/User/getUsers', getUsers);
router.post('/User/createUser', createUser);
router.put('/User/updateUser/:id',updateUser);
router.delete('/User/deleteUser/:id',deleteUser);
router.get('/User/getUser/:id',getUser );
router.post('/User/addFlight', addFlight);
router.get('/User/getUserFlights', getUserFlights);
router.post('/User/addTicket', addTicket);
router.get('/User/getUserTickets', getUserTickets);

//Airports
router.get('/getAirports', getAirports);
router.post('/createAirport', createAirport);
router.put('/updateAirport/:id', updateAirport);
router.delete('/deleteAirport/:id', deleteAirport);
router.get('/getAirport/:id', getAirport);
router.post('/addAirline', addAirline);
router.get('/getAirportsByCountry', getAirportBycountry);

//Airlines
router.get('/api/airlines', get_airline);
router.post('/api/airlines', create_airline);
router.put('/api/airlines/:id', update_airline);
//router.delete('/api/airlines/:id, delete_airline)
router.get('/api/airlines/:id', get_id_airline);
router.post('/api/addAirport', addAirport);

//Flights
router.get('/api/flights', getFlights);
router.post('/api/flights', createFlight);
router.put('/api/flights/:id',updateFlight);
router.delete('/api/flights/:id',deleteFlight);
router.get('/api/flights/:id',getFlight );

//scale
router.get('/api/ScaleFlights',getFlightsScale);

//recommended Flights
router.get('/api/recommended', getRecommendedFlights);

//Tickets
router.get('/api/tickets', getTickets);
router.post('/api/tickets', createTicket);
router.put('/api/tickets/:id', updateTicket);
router.delete('/api/tickets/:id', deleteTicket);
router.get('/api/tickets/:id', getTicket);

//Login - Register
router.get('/isRegistered', getIsRegistered);
router.post('/register',jwtCheck, postRegister);
router.post('/login',jwtCheck, postLogin);
router.put('/setInfo',jwtCheck, putSetInfo);

//Searchs
router.get('/getAirportsByInput/:input', getAirportsByInput);
router.get('/getFlightsByQuery', getFlightsByQuery);

//Profile
module.exports = router;