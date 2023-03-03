const {Ticket, Flight, User} = require('../db.js');

    const getTickets = async (req, res) => {

        try {

            const tickets = await Ticket.findAll()
            res.json(tickets);

        }catch (error) {

            return res.status (400).json({message: error.message})

        }
    };
    const getTicket = async (req, res) => {

        const {id} = req.params;

        try {

            const ticketId = await Ticket.findOne({
                where: {id},
                include: [
                    { model: User },
                    { model: Flight }
                  ]
            })

            if(!ticketId)return res.status(404).json({massage:'Ticket not exist'})

            res.json(ticketId);
        }catch(error) {

            return res.status(400).json({message: error.message});
        }
    };

    const  createTicket = async (req,res) =>{

        const { seat, flightId, userId} = req.body;

        const flight = await Flight.findByPk(flightId)

        try {

            const newTicket = await Ticket.create({
                seat: seat,
                UserId: userId,
                FlightId: flightId
            });

            await Flight.update({
                seatsAvailable:flight.seatsAvailable - seat
            },{
                where:{
                    id:flightId,
                }
            })
            res.status(200).send(newTicket); 

        }catch(error) {

            return res.status (400).json({message: error.message})

        }
    };

    const updateTicket = async (req, res ) =>{

        const { id } = req.params;
        const {namePassanger,email}= req.body;
        
        try {
            const ticketnew = await Ticket.findByPk(id)
            //Metodo Update?
            if (ticketnew.activatedTicket === false) {
                ticketnew.namePassanger = namePassanger,
                ticketnew.email = email,
                ticketnew.activatedTicket = true
        
                await ticketnew.save()
                const newTicket = await Ticket.findByPk(id)
                res.status(200).json({
                    message:'successfully modified',
                    change:newTicket
                })
            }else{
                res.status(400).send("Este ticket ya esta asignado")
            }

        }catch (error) {

            return res.status (400).json({message: error.message})

        }
    };

    const deleteTicket= async (req, res ) =>{
        try {
            const { id } = req.params

            const ticketId = await Ticket.findOne({
                where: {id},
                include: [{
                    model: Flight,
                }]
            })

            await Flight.update({
                seatsAvailable:ticketId.Flight.seatsAvailable + ticketId.seat
            },{
                where:{
                    id:ticketId.Flight.id
                }
            }) 

            await Ticket.destroy({
                where:{
                    id,
                }
            })
        
            res.status(200).send('deleted successfully')

        }catch(error){

            return res.status (400).json({message: error.message})

        }
    }

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  };