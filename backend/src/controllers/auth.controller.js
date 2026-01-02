import User from "../models/user.model.js"
import bcrypt from "bcryptjs" // used for hashing the passwords
import { generateToken } from "../lib/utils.js"; // Having token means user is online
import cloudinary from "../lib/cloudinary.js";

//Tested the function one by one using postman app on desktop
export const signup = async (req, res)=>{
    const {fullName, email, password} = req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All the fields are required!"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 char!"});
        }

        const user = await User.findOne({email}) // get the user from database if exist

        if(user) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        })

        if(newUser){// if above new user is created successfully send a token!! which is created in util of lib
                    // to send as JWT resposnce (javascript web token)
            generateToken(newUser._id, res)// in the utils
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                password:hashedPassword,
                profilePic:newUser.profilePic,
                createdAt:newUser.createdAt
            })

        }else{
            return res.status(400).json({message:"Invalid user data!!"})
        }


    }catch(error){
        console.log("Error in signup controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
};

export const login =async (req, res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}); // getting the user with the specified email from database use this throughout...
        if(!user){
            return res.status(400).json({message:"Invalid Credential!"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credential!"})
        }

        generateToken(user._id, res);

        res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,
                createdAt:user.createdAt
            })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(502).json({message:"Internal Server Error"});
    }
    
}

export const logout = (req, res)=>{
    try {

        //this set the user as offline if their cookie is expired(i.e token expired)
        res.cookie("jwt", "", {maxAge:0}); // maxAge = 0 expire the cookie (token) immediatly by reducing the life
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//used a thid party site called cloudinary for dealing with image uploads ( user thier AIP key, API secret, name)
export const updateProfile = async (req, res)=>{
    try {
        const {profilePic} = req.body;
        const userID = req.user._id // rember this was added by the protectRoute before coming here
        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required!"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic) // take the responce from External API
        const updatedUser = await User.findByIdAndUpdate(userID, {profilePic:uploadResponse.secure_url}, {new:true});

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in update profile", error)
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = (req, res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
         console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}