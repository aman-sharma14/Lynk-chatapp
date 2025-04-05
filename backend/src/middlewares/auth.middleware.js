import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


//this checks if user is authenticated using their cookie to perform othe operations like sending msgs, profile 
// basically serving pages only if user is loggedin
export const protectRoute = async (req,res,next)=>{
    try{

        const token = req.cookies.jwt; //get the jwt cookie 

        if(!token){
            return res.status(401).json({message : "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET) //verify token

        if(!decoded) {
            return res.status(401).json({message : "Unauthorized - Invalid token"})
        }

        //extract userId from token and send details except password
        const user = await User.findById(decoded.userId).select("-password"); 

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        //now add user to request body that will be sent to next operation (eg. profile, msgs, etc)
        req.user = user;
        next();

    }catch(error){
        console.log("Error in protectRoute middleware ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }
}