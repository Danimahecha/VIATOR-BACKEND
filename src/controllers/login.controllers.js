const {User} = require('../db.js');

    const postLogin = async (req, res) => {
        const {id} = req.body

       try {
            if(id){
                const user = await User.findByPk(id)
                if(user){
                    res.status(200).send("True")
                }else{
                    res.status(200).send("False")
                }
            }
        }catch (error) {
            res.send(error.message)
        }
    }

    const postRegister = async (req, res) => {
        const {sub, email, picture} = req.body

        try {
            await User.create({
                id: sub,
                email: email,
                picture: picture,
            })
            res.status(200).send("Usuario creado exitosamente")
        }catch (error) {
            res.status(500).send(error.message)
        }
    }


    const putSetInfo = async (req, res) => {
        const {names, lastNames, nickname,DateOfBirth,phoneNumber,country,city,picture, email, idSubAuth0} = req.body

        const user = await User.findByPk(idSubAuth0)
       
        try {
            await user.update({
                givenName: names,
                familyName: lastNames,
                nickName: nickname,
                phone: phoneNumber,
                email: email,
                country: country,
                city:city,
                birthdate: DateOfBirth,
                picture: picture
            })
            await user.save()
            res.status(200).send("Actualizado correctamente")
        } catch (error) {
            res.status(500).send(error)
        }
    }

module.exports = {
    postLogin,
    postRegister,
    putSetInfo,
  };