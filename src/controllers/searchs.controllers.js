const {Airport, Flight} = require('../db.js');
const { Op } = require('sequelize');

    const getAirportsByInput = async (req, res) => {

        //Country 
        const {input} = req.params;

        try {

            const airports = await Airport.findAll({
                where: {
                  [Op.or]: [
                    { name: { [Op.like]: `%${input}%` } },
                    { city: { [Op.like]: `%${input}%` } },
                    { country: { [Op.like]: `%${input}%` } }
                  ]
                }
              })

              if(airports.length === 0) return res.status(404).send({massage:'There are no airports with this name'})
              else res.status(200).send(airports);

            /* const airportsPerCountries = await Airport.findAll({
                where: {country: { [Op.like]: `%${input}%` }},
            })

            if(!airportsPerCountries){
                const aiportsPerCity = await Airport.findAll({
                    where: {city: { [Op.like]: `%${input}%` }},
                })

                if(!aiportsPerCity) return res.status(404).send({massage:'There are no airports'})
                else res.status(200).send(aiportsPerCity);
            }

            if(airportsPerCountries) res.status(200).send(airportsPerCountries); */

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };
  


module.exports = {
    getAirportsByInput,
  };
