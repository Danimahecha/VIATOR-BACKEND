const {Flight}= require('../db')
const {FligthRandom} = require('../utils/utils.js')

const getRecommendedFlights = async (req, res)=>{
    try {
        const vuelos =await Flight.findAll()
        if (vuelos.length < 1 ) {
            return res.status(400).json({error:"No existe vuelos a recomendar"})
        }else{
            let random=FligthRandom(vuelos)
            res.json(random)
        }
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
} 
module.exports = getRecommendedFlights