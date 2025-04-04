import { generateToken } from "../lib/utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body;
    try{

        //check password length
        if(password.length < 6){
            return res.status(400).json({
                message : "Password must be at least of 6 chracaters"
            });
        }

        const user = await User.findOne({email}); //checks if user exists based on email returns bool

        if(user) return res.status(400).json({message : "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if (newUser){
            //generate jwt token if new user created successfully
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic,
            });
            
        }
        else{
            res.status(400).json({message : "Invalid User data"});
        }

    }catch(error){
        console.log("Error in signup controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }
}

export const login = (req,res) => {
    res.send("login route")
}

export const logout = (req,res) => {
    res.send("logout route")
}