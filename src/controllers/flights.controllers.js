

const { Flights} =require('../models/Fligths.js');

const getFlights = async (req, res) => {
    try {
        const flight = await Flights.findAll()
        res.json(flight);
        } catch (error) {
        return res.status (400).json({message: error.message})
        }
};
const getFlight = async (req, res) => {
    try {
        const {id} = req.params;
        const flight = await Flights.findOne({
            where: {id}
        })
        if(!flight)return res.status(404).json({massage:'flight not exist'})
        res.json(flight);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

const  createFlight = async(req,res) =>{
    const { origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice, idAirline } = req.body;
    
    try {
        const newflight = await Flights.create({
            
            origin,
            destiny,
            dateTimeDeparture,
            dateTimeArrival,
            seatsAvailable,
            ticketPrice,
           foreingnKey:{
            name: 'Aereolineas_id',
            value: idAirline
           }
            
        });
        res.json (newflight); 
    } catch (error) {
        return res.status (400).json({message: error.message})   
    
}
};

const updateFlight = async (req, res ) =>{
    try {
        const { id } = req.params;
        const {origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice}= req.body;
        
    const flight = await Flights.findByPk(id)
    flight.origin = origin,
    flight.destiny = destiny,
    flight.dateTimeArrival= dateTimeArrival,
    flight.dateTimeDeparture = dateTimeDeparture,
    flight.seatsAvailable= seatsAvailable,
    flight.ticketPrice = ticketPrice,
    
    await flight.save()

    res.status(200).send('successfully modified')
    } catch (error) {
        return res.status (400).json({message: error.message})

    }
    
    
};
const deleteFligth =async(req, res)=>{
    const{id}= req.params;
    if(!id) res.status(404).send('you did not enter id') 
    else{
        await Flights.destroy({
            where: {
                id
            }
        })
        .then(()=> res.status(299).send('successfully deleted'))
        .catch(e=> res.satus(400).json({message: e.message}))
    }


}
module.exports={getFlight,getFlights,createFlight,updateFlight,deleteFligth}