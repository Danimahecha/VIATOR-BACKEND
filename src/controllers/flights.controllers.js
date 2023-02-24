const {Flight, Airline, Airport} = require('../db.js');

    const getFlights = async (req, res) => {
        try {

            const flights = await Flight.findAll()
            res.json(flights);

        }catch(error){

            return res.status (400).json({message: error.message})

        }
    };

    const getFlight = async (req, res) => {

        try {

            const {id} = req.params;

            const flight = await Flight.findOne({
                where: {id},
                include: [{
                    model: Airline,
                    attributes: ['name','infoContact','rating'],
                    include: [
                        {model: Airport, attributes: ['name']}
                    ]
                }]
            })

            if(!flight)return res.status(404).json({massage:'flight not exist'})
            res.json(flight);

        }catch(error){

            return res.status(400).json({message: error.message});

        }
    };

    const  createFlight = async(req,res) =>{

        const { airportOriginId,airportDestinyId,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice, AirlineId } = req.body;

       const airportOrigin = await Airport.findByPk(airportOriginId)
       const airportDestiny = await Airport.findByPk(airportDestinyId)

       const fecha = new Date(dateTimeDeparture)
       console.log(dateTimeDeparture)
       console.log(fecha)
        console.log(fecha.toLocaleDateString())
        try {
            const newFlight = await Flight.create({
            
                origin: `${airportOrigin.name}, ${airportOrigin.city}`,
                destiny: `${airportDestiny.name}, ${airportDestiny.city}`,
                dateTimeDeparture: dateTimeDeparture,
                dateTimeArrival: dateTimeArrival,
                seatsAvailable: seatsAvailable,
                ticketPrice: ticketPrice,
                AirlineId: AirlineId,
            
            });

            res.json (newFlight); 

        }catch(error) {

            return res.status (400).json({message: error.message})   

        }
    };

    const updateFlight = async (req, res ) =>{
        
        try {
            const { id } = req.params;
            const {origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice}= req.body;

            const flight = await Flight.findByPk(id)
            //Metodo Update?
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

    const deleteFlight = async (req, res ) =>{

        try {

            const { id } = req.params
            await Flight.destroy({
                where:{
                    id,
                }
            })

            res.status(200).send('deleted successfully')

        }catch(error) {

            return res.status (400).json({message: error.message})

        }
    }

module.exports = {
    getFlights,
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight
  };