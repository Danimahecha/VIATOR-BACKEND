const {Airline, Airport} = require('../db.js');

    const get_airline = async(req,res) =>{
        try {
            const airlineBD = await Airline.findAll()
            res.json(airlineBD)
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    const get_id_airline = async(req,res) =>{
        
        const {id} = req.params;

        try {
            const airline = await Airline.findOne({
                where: {id},
                include: [{
                    model: Airport,
                    attributes: ['name', 'country', 'city']
                }]
            })

            if (airline) {
                res.json(airline)
            }else{
                res.status(404).json({message:'Id not found'})
            }
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    } 

     const create_airline = async(req,res) =>{
        const {name,infoContact,rating} = req.body
        try {
            if (!name ||!infoContact ||!rating) {
                res.status(404).json({message:'Oops some of the fields are empty'})
            } else {
                const newAirline = await Airline.create({
                    name:name,
                    infoContact:infoContact,
                    rating:rating
                })
                res.json(newAirline)
            }
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }

    const update_airline = async(req,res) => {
        try {
            const {id} = req.params;
            const {name,infoContact,rating} = req.body

            await Airline.update({
                name: name,
                infoContact:infoContact,
                rating:rating
            },{
                where:{
                    id:id
                }
            })
            res.status(200).sen('successfully modified')
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }

    const  addAirportToAirline = async (req, res) => {

        const {  airlineId , airportsId} = req.body;

        try {

            const airline = await Airline.findByPk(airlineId)

            if(airportsId.length >= 1){
                airportsId.map( async (airportId) => {
                   let airport = await Airport.findByPk(airportId)
                   await airline.addAirport(airport)
                  })

                res.status(200).send("Aeropuertos agregados correctamente"); 
            }else{

                const airport = await Airport.findByPk(airportsId)
                await airline.addAirport(airport)

                res.status(200).send("Aeropuerto agregado correctamente"); 
            }
           
        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

    const  deleteAirportToAirline = async (req, res) => {

        const {  airlineId , airportsId} = req.body;

        try {

            const airline = await Airline.findByPk(airlineId)

            if(airportsId.length >= 1){
                airportsId.map( async (airportId) => {
                   let airport = await Airport.findByPk(airportId)
                   await airline.removeAirport(airport)
                  })

                res.status(200).send("Aeropuertos eliminados correctamente"); 
            }else{

                const airport = await Airport.findByPk(airportsId)
                await airline.removeAirport(airport)

                res.status(200).send("Aeropuerto eliminado correctamente"); 
            }
           
        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };


module.exports = {
    get_airline,
    get_id_airline,
    create_airline,
    update_airline,
    addAirportToAirline,
    deleteAirportToAirline
  };