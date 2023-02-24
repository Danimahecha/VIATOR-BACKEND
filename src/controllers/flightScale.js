const {Flight}= require('../db')

const getFlightsScale0 = async (req, res,) => {
    const {scale} = req.body;
    try {
        const flightScale = await Flight.findAll({attributes:["scale"]});
        const scaleFlight = flightScale.filter(value => value.scale  == 0)
         return res.status(200).send(scaleFlight )
    } catch (error) {
        return res.status (400).json({message: error.message})
    }
};

const getFlightsScale1 = async (req, res,) => {
    const {scale} = req.body;
    try {
        const flightScale = await Flight.findAll({attributes:["scale"]});
        const scaleFlight = flightScale.filter(value => value.scale  == 1)
         return res.status(200).send(scaleFlight )
    } catch (error) {
        return res.status (400).json({message: error.message})
    }
};
const getFlightsScale2 = async (req, res,) => {
    const {scale} = req.body;
    try {
        const flightScale = await Flight.findAll({attributes:["scale"]});
        const scaleFlight = flightScale.filter(value => value.scale  == 2)
         return res.status(200).send(scaleFlight )
    } catch (error) {
        return res.status (400).json({message: error.message})
    }
};



module.exports ={
    getFlightsScale0,
    getFlightsScale1,
    getFlightsScale2,
} 