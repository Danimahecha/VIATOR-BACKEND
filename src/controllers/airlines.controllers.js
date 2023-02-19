import { Airline } from '../models/Airline.js';
//import { Router } from 'express'; 


export const getAirlines = async (req, res) => {
    try {
        const Airlines = await Airline.findAll()
        res.json(Airlines);
        } catch (error) {
        return res.status (400).json({message: error.message})
        }
};
export const getAirline = async (req, res) => {
    try {
        const {id} = req.params;
        const Airline = await Airline.findOne({
            where: {id}
        })
        if(!Airline)return res.status(404).json({massage:'flight not exist'})
        res.json(Airline);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

export const  createAirline = async(req,res) =>{
    const { name, info_contact} = req.body;
    
    try {
        const newAirline = await Airline.create({
            
            name,
            info_contact
            
        });
        res.json (newAirline); 
    } catch (error) {
        return res.status (400).json({message: error.message})   
    
}
};

export const updateAirline = async (req, res ) =>{
    try {
        const { id } = req.params;
        const {name,info_contact}= req.body;
        
    const Airline = await Airline.findByPk(id)
    Airline.name = name,
    Airline.info_contact = info_contact
   await flight.save()

    res.status(200).send('successfully modified')
    } catch (error) {
        return res.status (400).json({message: error.message})

    }
    
    
};
export const deleteAirline = async (req, res ) =>{
    try {
        const { id } = req.params
    await Airline.destroy({
        where:{
            id,
        }
    })
    res.status(200).send('deleted successfully')

    } catch (error) {
        return res.status (400).json({message: error.message})
    }
}