const axios = require("axios")

//Crear code => verifier y challenge

/* const crypto = require('crypto');

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));
console.log("verifier", verifier);

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));
console.log("challenge", challenge);
 */

//M2M

const getUserRoleById = async (req, res ) =>{

  const {userId} = req.query

  try {
    
    const encodedUserId = encodeURIComponent(userId)
  
      const parm = new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'iqtMhZ0aWiuEJbqKRlME6GBPiDjDEuMG',
          client_secret: 'pfU0Pl2gyxwNdGjdqsFjNuwbGcl84uyUYbDGb9z7CQTAWsdiqngY5_CO3nEZuvr9',
          audience: 'https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/' 
        })
      
      const { data } = await axios.post(
        "https://dev-kvjr54lumq4827tu.us.auth0.com/oauth/token",
        parm,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
      
     console.log(data.access_token)
  
     //GET USER ID
     /*  const response = await axios.get(
          `https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/${encodedUserId}`,
          {
              headers: { 
                  Authorization: `Bearer ${data.access_token}`,
              },
          }
          ); 
          res.send(response.data) */
  
    //GET ROLE BY USER ID
    const response = await axios.get(
      `https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/${encodedUserId}/roles?include_totals=false`,
      {
          headers: { 
              Authorization: `Bearer ${data.access_token}`,
          },
      }
      ); 

      if(Array.isArray(response.data) && response.data.length === 0){
        return res.send("El usuario no posee ningun rol")
      }else{
        res.send(response.data[0].name)
      }

  } catch (error) {

    res.send(error.message)

  }
        
}



//Enviar la ordens
/* const response = await axios.post(
  `${PAYPAL_API}/v2/checkout/orders`,
  order,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
); */



/* var options = {
    method: 'POST',
    url: 'https://dev-kvjr54lumq4827tu.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'Wv5XDLGXATepf0hmLhpBbF2PTGCm5jLy',
      client_secret: 'RlH2SPSKyV1U3O1ClIhXog5wFh27-UyQB5qB1hpXX7v6uvUCkBkmfoG4ewxDj_rw',
      audience: 'this is a unique identifier viator'
    })
  };
  
  const tk = await axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 */

module.exports = {
  getUserRoleById,
  };