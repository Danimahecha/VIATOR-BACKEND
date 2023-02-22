const {Boletos} = require('../models/Boletos')

 const getBoletos= async(req, res)=>{
    const{id}= req.query.id;
  await Boletos.findAll({
    where:{
        foreignKey:{
            name: 'user_id',
            sourceKey: id
        }
    }
})
.then((BoletosUser)=> res.json(BoletosUser))
.catch(e=> res.satus(400).json({message: e.message}))
}
 const postBoleto=async(req, res)=>{
const{seat, idFligth,idUser}= req.body
await Boletos.bulkCreate({
    seat,
    foreignKey:{
        name: 'user_id',
        value: idUser,
    },
    foreignKey:{
        name: 'Fligths_id',
        value: idFligth,
    }
})
.then(response=> res.json(response))
.catch(e=> res.status(400).json({message: e.message}))

}
module.exports={postBoleto, getBoletos}