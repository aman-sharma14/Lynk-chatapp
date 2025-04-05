import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res)=>{ //to get contacts available other than u
    try{
        const loggedInUserId = req.user._id; //gets logged in user got from protect route
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password"); //get all except loggedin

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error in getUsersForSidebar controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }
}

export const getMessages = async (req,res) => {
    try{
        const {id:userToChatId} = req.params; //id of the other person got from dynamic route
        const myId = req.user._id; //loggedin id

        const messages = await Message.find({ //get msgs based on senderid or recevierid
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }
}

export const sendMessage = async (req,res) => {
    try{
        const { text, image } = req.body;
        const {id:receiverId} = req.params; //from dynamic route
        const senderId = req.user._id; //getting from protect route

        let imageUrl;

        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        //todo: realtime functionality goes here using socket.io

        res.status(201).json(newMessage); //send back to client



    }catch(error){
        console.log("Error in sendMessage controller ",error.message),
        res.status(500).json({message: "Internal Server error"})
    }

    
}