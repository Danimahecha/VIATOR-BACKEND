const {Ticket, Flight} = require('../db.js');

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll()
        res.json(tickets);
        } catch (error) {
        return res.status (400).json({message: error.message})
        }
};
const getTicket = async (req, res) => {
    const {id} = req.params;
    try {

        const ticketId = await Ticket.findOne({
            where: {id},
            include: [{
                model: Flight,
                //attributes: ['name','infoContact','rating', 'AirlineId']
            }]
        })
        if(!ticketId)return res.status(404).json({massage:'Ticket not exist'})
        res.json(ticketId);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

const  createTicket = async(req,res) =>{
    const { namePassanger,from,to,boardingTime,seat,gate,aeroLine, clase,FlightId} = req.body;

    try {
        const newTicket = await Ticket.create({

            namePassanger,
            from,
            to,
            boardingTime,
            seat,
            gate,
            aeroLine,
            clase,
            FlightId,
    });
        res.json (newTicket); 
    } catch (error) {
        return res.status (400).json({message: error.message})

}
};

const updateTicket = async (req, res ) =>{
    try {
        const { id } = req.params;
        const {namePassanger,from,to,boardingTime,seat,gate, aeroLine, clase}= req.body;

    const ticketnew = await Tickets.findByPk(id)
    ticketnew.namePassanger = namePassanger,
    ticketnew.from = from,
    ticketnew.to= to,
    ticketnew.boardingTime = boardingTime,
    ticketnew.seat= seat,
    ticketnew.gate = gate,
    ticketnew.aeroLine = aeroLine,
    ticketnew.clase = clase,

    await ticketnew.save()

    res.status(200).send('successfully modified')
    } catch (error) {
        return res.status (400).json({message: error.message})

    }


};
const deleteTicket= async (req, res ) =>{
    try {
        const { id } = req.params
    await Ticket.destroy({
        where:{
            id,
        }
    })
    res.status(200).send('deleted successfully')

    } catch (error) {
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