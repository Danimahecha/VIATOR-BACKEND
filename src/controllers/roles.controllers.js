const axios = require("axios")

//Obtener token
/* const params = new URLSearchParams();
params.append("grant_type", "client_credentials"); */


const createToken = async (req, res ) =>{

  const {userId} = req.query

  const encodedUserId = encodeURIComponent(userId)

    const parm = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'Wv5XDLGXATepf0hmLhpBbF2PTGCm5jLy',
        client_secret: 'RlH2SPSKyV1U3O1ClIhXog5wFh27-UyQB5qB1hpXX7v6uvUCkBkmfoG4ewxDj_rw',
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
    
    
    
    const response = await axios.get(
        `https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/${encodedUserId}`,
        {
            headers: { 
                Authorization: `Bearer ${JSON.stringify(data.access_token)}`,
                "Content-Type": "application/json"
            },
        }
        ); 
 

        res.send(data)
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
    createToken,
  };