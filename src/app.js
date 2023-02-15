
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const bodyParser = require('body-parser');
const axios = require('axios')
const morgan = require('morgan');
const cors = require('cors')
//const { auth } = require('express-openid-connect');
const {auth} = require('express-oauth2-jwt-bearer')
const routes = require('./routes/index.js');

require('./db.js');

// const verifyJwt = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: ''
//   }),
//   audience: 'this is a unique identifier viator',
//   issuer: 'https://dev-cz6i21an2opri7kv.us.auth0.com/',
//   algorithms: ['RS256'],
// })

const jwtCheck = auth({
  audience: 'this is a unique identifier viator',
  issuerBaseURL: 'https://dev-cz6i21an2opri7kv.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const server = express();

server.name = 'API';

server.use(cors())
//server.use(verifyJwt)
server.use(jwtCheck)

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(session({
  secret: "12345",
  resave: true,
  saveUninitialized: true
}))

//Middleware Auth0

// server.use(
//   auth({
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
// test

module.exports = server;


