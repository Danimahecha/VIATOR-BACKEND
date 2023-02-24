const {Airport, Airline, Flight} = require('../db.js');
const { Op } = require('sequelize');
const moment = require('moment');

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

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };

    const getFlightsByQuery = async (req, res) => {

        const {origin, destiny, dateTimeDeparture, dateTimeArrival, passengers} = req.query

        const dateFormat = 'YYYY-MM-DD HH:mm:ss'

        const ConvertedDateTimeDeparture = moment(dateTimeDeparture).format(dateFormat)
        const ConvertedDateTimeArrival = moment(dateTimeArrival).format(dateFormat)

        try {
            if(origin && destiny && passengers){
                const flights = await Flight.findAll({
                    where: {
                      [Op.and]: [
                        { origin: { [Op.like]: `%${origin}%` } },
                        { destiny: { [Op.like]: `%${destiny}%` } },
                        { dateTimeDeparture: { [Op.eq]: ConvertedDateTimeDeparture} },
                        { dateTimeArrival: { [Op.eq]: ConvertedDateTimeArrival} },
                        { seatsAvailable: { [Op.gte]: passengers } },
                      ]
                    }
                  })

                  res.status(200).send(flights)
            }
        } catch (error) {

          return res.status(400).send({message: error.message});

        }
    }

module.exports = {
    getAirportsByInput,
    getFlightsByQuery
  };

