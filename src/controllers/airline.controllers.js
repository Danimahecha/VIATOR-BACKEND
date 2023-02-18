import {Airline} from '../models/'

export const get_airline = async(req,res) =>{
    try {
        const airlineBD = Airline.findAll()
        res.json(airlineBD)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const get_id_airline = async(req,res) =>{
    try {
        const {id} = req.params;
        let idAirline = Airline.findByPk(id)
        if (idAirline) {
            res.json(idAirline)
        }else{
            res.status(404).json({message:'Id not found'})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const create_airline = async(req,res) =>{
    const {name,info_contact} = req.body
    try {
        if (!name_airline || !score || !info_contact) {
            res.status(404).json({message:'Oops some of the fields are empty'})
        } else {
            const newAirline = await Airline.create({
                name,info_contact
            })
            res.json(newAirline)
        }
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const update_airline = async(req,res) => {
    try {
        const {id} = req.params;
        const {name,info_contact} = req.body

        await Airline.update({
            name: name,
            info_contact:info_contact
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