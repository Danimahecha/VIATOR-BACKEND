const { default: axios } = require('axios');
const {User, Ticket}= require('../db')
const transferTickets=async(req, res)=>{
try {const {email, idTicket}= req.body;
  const user= await User.findOne({
    where:{
        email
    }
  })
  const userId= user.id
  const ticket= await Ticket.findByPk(idTicket,{
include:[{
    model: User
}]
  },
    {
where:{
    State: false
}
  })
  if(!ticket){
    res.status(400).send('non-transferable ticket')
  }else{
 await ticket.setUser(userId)

 res.send('your ticket was transferred successfully')
  }}
  catch(e){
    res.status(400).json({message: e.message})
  }
   
}
module.exports= {transferTickets};