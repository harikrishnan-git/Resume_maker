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

        res.status(200).json({email,token,userId: user._id});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

// GET /api/user/:userId
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {registerUser,loginUser,getUserById};