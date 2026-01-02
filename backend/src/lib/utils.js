import jwt from "jsonwebtoken" // installed using npm i at the begeinin

export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:"7d"})

    //send the JWT to cookies 
    res.cookie("jwt", token, { // here jwt is simple a name to identify a cookie
        maxAge: 7*24*60*60*1000, // 7 days in milisecond expire in 7 day user have to relogin
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // prevents CSRF attacks cross-site
        secure: process.env.NODE_ENV !== "development"

    });
    return token;

};