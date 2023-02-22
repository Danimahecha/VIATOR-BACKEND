const { User } =require("../models/User.js");
//import { flight } from "../models/Flight.js";

 const getUsers =async(req, res) => {
    try {
    const users = await User.findAll()
    res.json(users);
    } catch (error) {
    return res.status (400).json({message: error.message})
    }

};

 const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await user.findOne({
            where: { id }
        })
        if(!user)return res.status(404).json({massage:'Users not exist'})
        res.json(user);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
};

 const createUser =async(req,res)=>{
    const { name }= req.body;
    
    try {
        const newUser = await User.create({
            name
        
        });
        res.json (newUser); 
    } catch (error) {
        return res.status (400).json({message: error.message})   
    
}
};

 const updateUser = async (req, res ) =>{
    try {
        const { id } = req.params;
        const { name }= req.body

    const user = await User.findByPk(id)
    user.name = name
    await user.save()

    res.status(200).send('successfully modified')
    } catch (error) {
        return res.status (400).json({message: error.message})

    }
   
    
};

 const deleteUser = async (req, res ) =>{
    try {
        const { id } = req.params
    await User.destroy({
        where:{
            id,
        }
    })
    res.status(200).send('deleted successfully')

    } catch (error) {
        return res.status (400).json({message: error.message})
    }
}
module.exports={getUser,getUsers,createUser,updateUser,deleteUser}