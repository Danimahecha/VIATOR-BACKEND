const axios = require("axios")

const {PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API, HOST} = process.env

    const createOrder = async (req, res ) =>{

      const order = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "105.70",
            },
          },
        ],
        application_context: {
          brand_name: "mycompany.com",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${HOST}/capture-order`,
          cancel_url: `${HOST}/cancel-payment`,
        },
      };
  

        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
    
        const {
          data: { access_token },
        } = await axios.post(
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
    
        const response = await axios.post(
          `${PAYPAL_API}/v2/checkout/orders`,
          order,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
    
        console.log(response.data);
    
        return res.json(response.data);

    }

    const captureOrder = async (req, res ) =>{
    
        res.send('capture order')
     
    }

    const cancelOrder = async (req, res ) =>{
    
        res.send('cancel order')
     
    }

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
  };