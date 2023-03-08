const emailer = require("../utils/emailer.js");
const { User } = require("../db.js");

const postLogin = async (req, res) => {

  const { id } = req.body;

  if(!id){

    return res.status(400).send("Id en  body no encontrada")

  }else{

    try {

      const user = await User.findByPk(id);

      if (user) {

        return res.status(200).send("True");

      } else {

        res.status(200).send("False");

      }
    
  } catch (error) {

    return res.send(error.message);

  }
  }
  
};

const getIsRegistered = async (req, res) => {

  const { id } = req.query;

  if(!id){

    return res.status(400).send("Id query no encontrada")

  }else{

    try {
   
        const user = await User.findByPk(id);

        if (user.email === "No registrado") {

          return res.status(200).send("Usuario no registrado");

        } else {

          return res.status(200).send("Usuario registrado");

        }
      
    } catch (error) {

      return res.send(error.message);
    }
  }
  
};

const postRegister = async (req, res) => {
  const { sub, email, picture } = req.body;

  if(
    !sub || typeof sub !== 'string' || sub.length < 2 ||
    !email || typeof email !== 'string' || email.length < 2 ||
    !picture || typeof picture !== 'string'|| picture.length < 2 
    ){

      return res.status(400).send("Parametros por body incompletos o informacion invalida")

    }else{

      try {

        await User.create({
          id: sub,
          email: email,
          picture: picture,
        });
    
        return res.status(200).send("Usuario creado exitosamente");

      } catch (error) {

        return res.status(500).send(error.message);

      }
    }

  
};

const putSetInfo = async (req, res) => {
  const {
    names,
    lastNames,
    nickname,
    DateOfBirth,
    phoneNumber,
    country,
    city,
    picture,
    email,
    idSubAuth0,
  } = req.body;

  if(
    !names || typeof names !== 'string' || names.length < 2 ||
    !lastNames || typeof lastNames !== 'string' || lastNames.length < 2 ||
    !picture || typeof picture !== 'string'|| picture.length < 2 ||
    !DateOfBirth || !(DateOfBirth instanceof Date)||
    !phoneNumber || typeof phoneNumber !== 'number' || 
    !country || typeof country !== 'string'|| country.length < 2 ||
    !city || typeof city !== 'string' || city.length < 2 ||
    !picture || typeof picture !== 'string' || picture.length < 2 ||
    !email || typeof email !== 'string'|| email.length < 2 ||
    !idSubAuth0 || typeof idSubAuth0 !== 'string'|| idSubAuth0.length < 2 
    ){

      return res.status(400).send("Parametros por body incompletos o informacion invalida")
      
  } else {

    const user = await User.findByPk(idSubAuth0);

    try {

      await user.update({
        givenName: names,
        familyName: lastNames,
        nickName: nickname,
        phone: phoneNumber,
        email: email,
        country: country,
        city: city,
        birthdate: DateOfBirth,
        picture: picture,
      });

      await user.save();

      const userRegistered = await User.findByPk(idSubAuth0);
  
      emailer.sendMail(userRegistered);

      return res.status(200).send("Actualizado correctamente");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  

  
};

module.exports = {
  postLogin,
  postRegister,
  putSetInfo,
  getIsRegistered,
};