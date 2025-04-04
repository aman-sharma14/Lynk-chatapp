import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body;
    try{

        if(!fullName || !email || !password){
            return res.status(400).json({
                message : "All fields required"
            });
        }

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

export const login = async (req,res) => {
    const {email, password} = req.body;
    
    try{
        //checks if user exists in db
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const isPassword = await bcrypt.compare(password,user.password); //check password match

        if(!isPassword){
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        generateToken(user._id,res);
        
        res.status(201).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic,
        });
    }catch(error){
        console.log("Error in login controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0}) //clear cookie
        res.status(200).json({message: "Logged Out successfully"})
    }
    catch(error){
        console.log("Error in logout controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    
    }
}