

const { flight } =require('../models/Flight.js');

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
        const flight = await flight.findOne({
            where: {id}
        })
        if(!flight)return res.status(404).json({massage:'flight not exist'})
        res.json(flight);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const  createFlight = async(req,res) =>{
    const { origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice, idAirline } = req.body;
    
    try {
        const newFlight = await flight.create({
            
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
        res.json (newFlight); 
    } catch (error) {
        return res.status (400).json({message: error.message})   
    
}
};

export const updateFlight = async (req, res ) =>{
    try {
        const { id } = req.params;
        const {origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice}= req.body;
        
    const flight = await flight.findByPk(id)
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
export const deleteFligth =async(req, res)=>{
    const{id}= req.params;
    if(!id) res.status(404).send('you did not enter id') 
    else{
        await flight.destroy({
            where: {
                id
            }
        })
        .then(()=> res.status(299).send('successfully deleted'))
        .catch(e=> res.satus(400).json({message: e.message}))
    }


}