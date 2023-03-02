const axios = require("axios")

const {PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API, HOST} = process.env

    const createOrder = async (req, res ) =>{

      const {name, quantity, valuePerTicket, description} = req.body

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
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-payment`,
          },
        };
    
          //Obtener token
          const params = new URLSearchParams();
          params.append("grant_type", "client_credentials");
      
          const { data: { access_token },} = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
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
      
          console.log(response.data.links[1]);
      
          return res.json(response.data.links[1]);

      } catch (error) {

        return res.status(400).json({message: error.message});

      } 

    }

    const captureOrder = async (req, res ) =>{
    
      const { token } = req.query;

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
        
        res.redirect("http://localhost:3000/myTickets");
        
      } catch (error) {

        console.log(error.message);

        return res.status(500).json({ message: "Internal Server error" });
      }

    };
     
    

    const cancelOrder = async (req, res ) =>{
    
      res.redirect("http://localhost:3000/myTickets");
     
    }

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
  };