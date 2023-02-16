const {auth, requiredScopes} = require('express-oauth2-jwt-bearer')

   const jwtCheck = auth({
    secret: '7h92P5guwTCGsDRBqHbC392uAcXMLsE1',
  audience: 'this is a unique identifier viator',
  issuerBaseURL: 'https://dev-kvjr54lumq4827tu.us.auth0.com/',
  tokenSigningAlg: 'HS256'
  });    

  const checkScopes = requiredScopes('read:users');

  module.exports = {
    jwtCheck,
    checkScopes,
  };