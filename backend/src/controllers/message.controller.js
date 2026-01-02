import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socketIO.js";

export const getUsersForSidebar = async (req, res)=>{
    try {
        const loggedInUserId = req.user._id;// get current user id

        // get all the user except the logged in user which is fetching the online users
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password"); // remove the password
        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar:", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getMessages = async(req, res)=>{
    try {
        const {id:userToChatId} = req.params // change alias of id to userToChatId
        const myId = req.user._id;

        //get all the messages from the message model wher sender and receiver id is either of the above
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
        console.log("Error in getMessages:", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const sendMessage = async(req, res)=>{
    try {
        const {text, image} = req.body // fetch the message
        const{id: receiverId} = req.params;// get id from the URL parameter passed as :id
        const myId = req.user._id;

        //handle the image case
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Add the message to the database model of message
        const newMessage = new Message({
            senderId:myId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();
        // Before config this we have created a helper function in socketIO.js called getReceiverSocketID
        const receiverSocketId = getReceiverSocketId(receiverId);// socket id of that user whome we are sending the message
        // console.log("Emitting newMessage to socket:", receiverSocketId);

        if(receiverSocketId){ // if user is online send message in real time
            io.to(receiverSocketId).emit("newMessages", newMessage); // send the message generated as a function newMessage to the socket
            // console.log("New message payload:", newMessage);

        }

        res.status(201).json(newMessage);


        
    } catch (error) {
        console.log("Error in sendMessage:", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}