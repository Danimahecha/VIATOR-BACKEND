const { Router } = require('express');
const {User} = require('../db.js');
const axios = require('axios');
const {requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const { jwtCheck , checkScopes} = require("../middlewares/jwtCheck.js");

const router = Router();
//MAIN TEST modifi 12
router.get('/test', (req, res) => {
    res.send('Hello index')
})

router.get('/protected', jwtCheck , checkScopes, async (req, res) => {
      try {
         const accessToken = req.headers.authorization.split(' ')[1]
         console.log(accessToken)
         const response = await axios.get("https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/google-oauth2%7C112318356800084041668?fields=email&include_fields=true",{
         //"https://dev-kvjr54lumq4827tu.us.auth0.com/userinfo"
         //const response = await axios.get("https://dev-cz6i21an2opri7kv.us.auth0.com/userinfo", {
             headers:{
                Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpSTEthRkk5cEN0cmtyZkdJQlY2eCJ9.eyJpc3MiOiJodHRwczovL2Rldi1rdmpyNTRsdW1xNDgyN3R1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJpcXRNaFowYVdpdUVKYnFLUmxNRTZHQlBpRGpERXVNR0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYta3ZqcjU0bHVtcTQ4Mjd0dS51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3NjU2MDEzNCwiZXhwIjoxNjc2NjQ2NTM0LCJhenAiOiJpcXRNaFowYVdpdUVKYnFLUmxNRTZHQlBpRGpERXVNRyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.yQLbuStSDoeScMKiZxcWP297OMMBZJIMmisYwMIlhE7Ji5V1nbbBZB8LuMfwcFlm26xepAWCqK2R2HTHKpo0wVrhclkXLj6Mzo_mmgUNNWU2W7bXuobEBlDci7MARW_Jpv_va_V5TQGDg8GY2EPdcuzhV3rcVEZRSwlFegLi_c78hI26j77ehCj5ujf39cbEN4JN9uCjOj_f9Qr1l__SqVyUFkK2_5l3EekrSXpHgu1NhzFVJk4FM6Jk44ATjyF5Qn63G2kd1aWDxKxPTKNNCIVlZx1IG3bviVMtQTxs4FbT_1QZ5NtMuL6-AEkkAUqyxmnvTk0qcGg2357imJ04yw`,
             }
         } )
         const userinfo = response.data
         res.send(userinfo)
     } catch (error) {
         res.send(error.message)
     }
 
    //res.send("Hello from protectec rute")
})
/* const getToken = axios.get("http://path_to_your_api/", {headers: { "authorization": "Bearer TOKEN" },}).then(res => {
    console.log(res.data)
}) */

router.get('/getToken', async(req, res) => {
    try {
        const responde = await
        axios({
            method: 'post',
            url: 'https://dev-kvjr54lumq4827tu.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/json' }, 
            data: {
                "client_id":"GL4ZdJU4FKFshNgg90qty9wDNGfISceP",
                "client_secret":"yp378geIG8UEPKgO1KPkP-zvGXsDq0irhft3NBq-QwlY_0Rlomu7oEyJwN8GjogW",
                "audience":"this is a unique identifier viator",
                "grant_type":"client_credentials"
            }
          });
        const tok = responde.data
    
        res.send(tok)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/', async (req, res) =>{
    
    //res.send(req.oidc.isAuthenticated() ? req.session.user = req.oidc.user.nickname : 'Logged out')
    res.send("holaaa")
})

router.get('/profile', requiresAuth(), async (req, res) => {
    //res.send(JSON.stringify(req.oidc.user))
    const user = await User.findOne({where: {sub: req.oidc.user.sub}})

    res.send(user)
})

router.post('/register', requiresAuth(), async (req, res) => {
    //const {given_name, family_name, nickname, email, phone, picture} = req.body

    const sub = await req.oidc.user.sub.split("|")[0]

    try {
        if(sub === "auth0"){
            await User.create({
                nickname: req.oidc.user.nickname,
                picture: req.oidc.user.picture,
                email: req.oidc.user.email,
                sub: req.oidc.user.sub
            })
            res.status(200).send("Usuario creado con exito")
        }if(sub === "google-oauth2"){
            await User.create({
                givenName: req.oidc.user.given_name,
                familyName: req.oidc.user.family_name,
                nickname: req.oidc.user.nickname,
                picture: req.oidc.user.picture,
                email: req.oidc.user.email,
                sub: req.oidc.user.sub
            })
            res.status(200).send("Usuario creado con exito")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/setInfo', requiresAuth(), async(req, res) => {
    const {given_name, family_name, nickname, email, phone, picture, id} = req.body

    const user = await User.findByPk(id)

    try {

        await user.update({
            givenName: given_name,
            familyName: family_name,
            nickname: nickname,
            phone: phone,
            email: email,
            picture: picture
        })
    
        await user.save()
        
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router;