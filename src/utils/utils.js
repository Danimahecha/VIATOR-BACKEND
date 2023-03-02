const { default: axios } = require('axios')
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


const CreateModels=async()=>{
 json.aereopuertos.map(async airP=>{
 await Airport.create(airP)
});
json.aereolineas.map(async airL=>{
  await Airline.create(airL)
});


json.relaciones.aereopuertos.map(async (rel)=>{
await axios.post('http://localhost:4000/api/addAirportToAirline', rel)
});


  
json.vuelos.map(async F=>{
await axios.post('http://localhost:4000/api/flights',F)
})
}
 
module.exports= {FligthRandom, CreateModels}
