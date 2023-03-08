const axios = require("axios")
const {User} = require('../db.js');

const {PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API, HOST, HOST_FRONT} = process.env

    const createOrder = async (req, res ) =>{

      const {userId, flightId, name, quantity, valuePerTicket, description} = req.body

      const encodedUserId = encodeURIComponent(userId)

      if(
        !userId || 
        !flightId || typeof flightId !== 'number' || 
        !name || typeof name !== 'string' || name.length < 2 ||
        !quantity || typeof quantity !== 'number'||
        !valuePerTicket || typeof valuePerTicket !== 'number'||
        !description || typeof description !== 'string'|| description.length < 2 
        ){

        return res.status(400).send("Parametros por body incompletos o informacion invalida")

      }else{

        const user = await User.findByPk(userId)

        if(!user){

          return res.status(404).send("El usuario no se encontro en la base de datos")

        }else{

          try {
            const order = {
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    //tendria que sumarse los valores de todos los boletos
                    value: quantity*valuePerTicket,
                    breakdown: {
                      item_total: {
                        currency_code: 'USD',
                        value: quantity*valuePerTicket
                      }
                  }
                  },
                  description: description,
                  items:[
                    { 
                      name: name,
                      quantity: quantity,
                      unit_amount: {
                        currency_code: 'USD',
                        value: valuePerTicket,
                      },
                      category: 'DIGITAL_GOODS',
                    }
                  ]
                },
                
              ],
              
              application_context: {
                brand_name: "viator.com",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${HOST}/capture-order?userId=${encodedUserId}&flightId=${flightId}&quantity=${quantity}`,
                cancel_url: `${HOST}/cancel-payment?flightId=${flightId}`,
              },
            };
        
              //Obtener token
              const params = new URLSearchParams();
              params.append("grant_type", "client_credentials");
          
              const { data: { access_token },} = await axios.post(
                `${PAYPAL_API}/v1/oauth2/token`,
                params,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  auth: {
                    username: PAYPAL_CLIENT_ID,
                    password: PAYPAL_SECRET,
                  },
                }
              );
          
              //Enviar la orden
              const response = await axios.post(
                `${PAYPAL_API}/v2/checkout/orders`,
                order,
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              );
          
              return res.json(response.data.links[1]);
    
          } catch (error) {
    
            return res.status(400).json({message: error.message});
    
          } 
        }
        
        
      }
      

    }

    const captureOrder = async (req, res ) =>{
    
      const { token, userId, flightId, quantity } = req.query;

      if(!token || !userId || !flightId || !quantity){

        return res.status(400).send("Parametros por query faltantes o incorrectos")

      }else{

        try {

          const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
              auth: {
                username: PAYPAL_CLIENT_ID,
                password: PAYPAL_SECRET,
              },
            }
          );
          
          if(response.data.status === 'COMPLETED'){
  
            await axios.post(`${HOST}/api/tickets`, {quantity: quantity, flightId:flightId, userId:userId})
  
            return res.redirect(`${HOST_FRONT}/home`);
            
          }else{
            return res.status(400).send(`PAGO PENDIENTE`);
          }
        } catch (error) {
  
          return res.status(500).json({message: error.message});

        }
      }

    };
     
    const cancelOrder = async (req, res ) =>{
    
      const { flightId } = req.query;
 
      res.redirect(`${HOST_FRONT}/flight/${flightId}`);
     
    }

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
  };