const {Airport, Airline} = require('../db.js');

    const getAirports = async (req, res) => {
        try {

            const airports = await Airport.findAll()
            res.status(200).send(airports);

        }catch(error){

            return res.status(400).send({message: error.message})

        }
    };

    const getAirport = async (req, res) => {

        const {id} = req.params;

        try {

            const airport = await Airport.findOne({
                where: {id},
                include: [{
                    model: Airline,
                    attributes: ['name','infoContact','rating']
                }]
            })

            if(!airport) return res.status(404).send({massage:'The airport does not exist'})

            res.status(200).send(airport);

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };

    const  createAirport = async (req, res) => {

        const { name, country, city} = req.body;

        try {
            const newAirport = await Airport.create({
            
                name:name,
                country: country,
                city:city
                
            });

            res.status(200).send(newAirport); 

        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

    const  addAirline = async (req, res) => {

        const { airportId ,airlineId } = req.body;

        try {
            const airport = await Airport.findByPk(airportId)

            const airline = await Airline.findByPk(airlineId)

            await airport.addAirline(airline)
            
            res.status(200).send("Aerolinea agregada correctamente"); 

        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

    const updateAirport = async (req, res) => {
        
        const { id } = req.params;
        const { name, country }= req.body;

        const airport = await Airport.findByPk(id)

        try {

            await airport.update({
                name: name, 
                country: country,
            })
            await airport.save()

            res.status(200).send("Actualizado correctamente")

        } catch (error) {

            return res.status(400).send({message: error.message})

        }
    };

    const deleteAirport = async (req, res) => {

        const { id } = req.params

        try {

            await Airport.destroy({
                where:{
                    id,
                }
            })

            res.status(200).send('deleted successfully')

        }catch(error) {

            return res.status(400).send({message: error.message})

        }
    }

module.exports = {
    getAirports,
    createAirport,
    updateAirport,
    deleteAirport,
    getAirport,
    addAirline,
  };