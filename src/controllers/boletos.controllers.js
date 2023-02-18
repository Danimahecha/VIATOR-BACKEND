const {Boletos} = require('../models/Boletos')

export const getBoletos= async(req, res)=>{
    const{id}= req.query.id;
  await Boletos.findAll({
    where:{
        foreingKey:{
            name: 'user_id',
            sourceKey: id
        }
    }
})
.then((BoletosUser)=> res.json(BoletosUser))
.catch(e=> res.satus(400).json({message: e.message}))
}
