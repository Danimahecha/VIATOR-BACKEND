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
                        {model: Airport, attributes: ['name']},
                        {
                            where:{
                                state: true
                            }
                        }
                    ]
                },
                {
                    where:{
                        state: true
                    }
                }]
            })

            if(!flight)return res.status(404).json({massage:'flight not exist'})
            res.json(flight);

        }catch(error){

            return res.status(400).json({message: error.message});

        }
    };

    const  createFlight = async(req,res) =>{

       const { roundTrip,airportOriginId,airportDestinyId,dateTimeDeparture,dateTimeArrival1,dateTimeReturn,dateTimeArrival2,seatsAvailable,ticketPrice,scale,AirlineId } = req.body;
       const airportOrigin = await Airport.findByPk(airportOriginId)
       const airportDestiny = await Airport.findByPk(airportDestinyId)

        try {
            const newFlight = await Flight.create({
            
                roundTrip:roundTrip,
                origin: `${airportOrigin.name}, ${airportOrigin.city}, ${airportOrigin.country}`,
                destiny: `${airportDestiny.name}, ${airportDestiny.city}, ${airportDestiny.country}`,
                dateTimeDeparture: dateTimeDeparture,
                dateTimeArrival1: dateTimeArrival1,
                dateTimeReturn: dateTimeReturn,
                dateTimeArrival2: dateTimeArrival2,
                seatsAvailable: seatsAvailable,
                ticketPrice: ticketPrice,
                scale:scale,
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
            const {origin,destiny,dateTimeDeparture,dateTimeArrival,seatsAvailable,ticketPrice,scale}= req.body;

            const flight = await Flight.findByPk(id)
            //Metodo Update?
            flight.origin = origin,
            flight.destiny = destiny,
            flight.dateTimeArrival= dateTimeArrival,
            flight.dateTimeDeparture = dateTimeDeparture,
            flight.seatsAvailable= seatsAvailable,
            flight.ticketPrice = ticketPrice,
            flight.scale=scale,

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

    const getFlightByAirline = async (req, res) => {

        const {airlineName} = req.query;

        try {

            const flights = await Flight.findAll({
                include: [{
                    model: Airline,
                    attributes: ['name']
                }]
            })

            if(!flights) return res.status(404).send({massage:'The airline does not exist'})

            //const flightsByAirlines = await flights.getAirline({where:{ name : airlineName}})
            const flightsByAirlines = flights.filter((flight) => flight.Airline.name === airlineName);

            res.status(200).send(flightsByAirlines);

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };
    const defuseFlights = async(req, res)=>{
        const {id, state}= req.body;
        try {
            const flight= await Flight.findByPk(id)
             await flight.update({
                state: state
             })
           await flight.save()
           res.send("vuelo seteado")
        } catch (error) {
            res.status(400).json({message: error.message});
        }
        };


module.exports = {
    getFlights,
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight,
    getFlightByAirline,
    defuseFlights
  };