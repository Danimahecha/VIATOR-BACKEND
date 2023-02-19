import { flight } from '../models/Flight.js';

export const getFlights = async (req, res) => {
    try {
        const flights = await flight.findAll()
        res.json(flights);
        } catch (error) {
        return res.status (400).json({message: error.message})
        }
};
export const getFlight = async (req, res) => {
    try {
        const {id} = req.params;
        const flightId = await flight.findOne({
            where: {id}
        })
        if(!flightId)return res.status(404).json({massage:'flight not exist'})
        res.json(flightId);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const  createFlight = async(req,res) =>{
    const { origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice } = req.body;
    
    try {
        const newFlight = await flight.create({
            
            origin,
            destiny,
            dateTimeDeparture,
            dateTimeArrival,
            seatsAvailable,
            ticketPrice,
           
           
            
        });
        res.json (newFlight); 
    } catch (error) {
        return res.status (400).json({message: error.message})   
    
}
};

export const updateFlight = async (req, res ) =>{
    try {
        const { id } = req.params;
        const {origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice}= req.body;
        
    const flightnew = await flight.findByPk(id)
    flightnew.origin = origin,
    flightnew.destiny = destiny,
    flightnew.dateTimeArrival= dateTimeArrival,
    flightnew.dateTimeDeparture = dateTimeDeparture,
    flightnew.seatsAvailable= seatsAvailable,
    flightnew.ticketPrice = ticketPrice,

    await flightnew.save()

    res.status(200).send('successfully modified')
    } catch (error) {
        return res.status (400).json({message: error.message})

    }
    
    
};
export const deleteFlight = async (req, res ) =>{
    try {
        const { id } = req.params
    await flight.destroy({
        where:{
            id,
        }
    })
    res.status(200).send('deleted successfully')

    } catch (error) {
        return res.status (400).json({message: error.message})
    }
}
