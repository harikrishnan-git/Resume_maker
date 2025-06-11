const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'}); //content in payload of jwt
}

//register user
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const user = await User.register(name,email,password);
        //create a token
        const token = createToken(user._id);

        res.status(200).json({name,email,password});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

//login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.login(email,password);
        //create a token
        const token = createToken(user._id);

        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports = {registerUser,loginUser};