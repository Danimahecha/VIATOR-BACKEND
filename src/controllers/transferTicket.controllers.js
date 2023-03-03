const { default: axios } = require('axios');
const {User, Ticket}= require('../db');
const { sendMailTransfer } = require('../utils/emailer');
const transferTickets=async(req, res)=>{
try 
{const {email, idUserE, idTicket}= req.body;
const userE= await User.findByPk(idUserE)
  const userR= await User.findOne({
    where:{
        email
    }
  })
  const userId= userR.id
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
 sendMailTransfer(userE, userR)
 res.send('your ticket was transferred successfully')
 
  }}
  catch(e){
    res.status(400).json({message: e.message})
  }
   
}
module.exports= {transferTickets};