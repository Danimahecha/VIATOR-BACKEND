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

      const ConvertedDateTimeDeparture = new Date(dateTimeDeparture)
      const ConvertedDateTimeArrival = new Date(dateTimeArrival)

      try {
          if(origin && destiny && passengers){
            const thirtyMinutes = 30 * 60 * 1000; // 30 minutos en milisegundos
            const dateTimeDepartureStart = new Date(ConvertedDateTimeDeparture.getTime() - thirtyMinutes);
            const dateTimeDepartureEnd = new Date(ConvertedDateTimeDeparture.getTime() + thirtyMinutes);
            const dateTimeArrivalStart = new Date(ConvertedDateTimeArrival.getTime() - thirtyMinutes);
            const dateTimeArrivalEnd = new Date(ConvertedDateTimeArrival.getTime() + thirtyMinutes);
            
            const flights = await Flight.findAll({
              where: {
                [Op.and]: [
                  { origin: { [Op.like]: `%${origin}%` } },
                  { destiny: { [Op.like]: `%${destiny}%` } },
                  {
                    dateTimeDeparture: {
                      [Op.between]: [dateTimeDepartureStart, dateTimeDepartureEnd]
                    }
                  },
                  {
                    dateTimeArrival: {
                      [Op.between]: [dateTimeArrivalStart, dateTimeArrivalEnd]
                    }
                  },
                  { seatsAvailable: { [Op.gte]: passengers } },
                ]
              }
            })
            console.log(flights.toString());
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

