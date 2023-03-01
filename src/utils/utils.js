const { addAirportToAirline } = require('../controllers/airlines.controllers')
const { createAirport, addAirlineToAirport } = require('../controllers/airports.controllers')
const{Airport, Airline, Flight}= require('../db')
const json = require('../testData.json')
function FligthRandom(vuelos){
    let arrFlights=[]
    let recomend=[]
    let i= 0
    for (const vuelo of vuelos) arrFlights.push(vuelo)
    arrFlights.sort(() => Math.random() - 0.5);
    while (i<3) {
        recomend.push(arrFlights[i])
        i++
    }
  return recomend;
    
}

async function relationAirports (airportsId, airlineId) {
  const airline = await Airline.findByPk(airlineId)

  if(airportsId.length >= 1){
      airportsId.map( async (airportId) => {
         let airport = await Airport.findByPk(airportId)
         await airline.addAirport(airport)
        })

  }else{
      const airport = await Airport.findByPk(airportsId)
      await airline.addAirport(airport)
  }
}
async function relationAirlines(airportId, airlinesId) {
  const airport = await Airport.findByPk(airportId)

            if(airlinesId.length >= 1){
                airlinesId.map( async (airlineId) => {
                   let airLine = await Airline.findByPk(airlineId)
                   await airport.addAirline(airLine)
                  })
            }else{

                const airline = await Airline.findByPk(airlinesId)
                await airport.addAirline(airline)

               
            }
  }

const CreateModels=async()=>{
 json.aereopuertos.map(async airP=>{
 await Airport.create(airP)
});
json.aereolineas.map(async airL=>{
  await Airline.create(airL)
});

//   json.relaciones.aereopuertos.map( (rel) => {
//      relationAirports(rel.airportsId, rel.airlineId)
//   });
// json.relaciones.aereolineas.map( rel=>{
//    relationAirlines(rel.airportId, rel.airlinesId)
// });

}

module.exports= {FligthRandom, CreateModels}
