// //This is the protectRoute
// import jwt from "jsonwebtoken"
// import User from "../models/user.model.js"

// export const protectRoute = async (req, res, next)=>{// next is the update function in put of auth.route
//     try {
//         const token = req.cookies.jwt// check if the cookie exist

//         if(!token){
//             res.status(401).json({message:"Unauthorized - No Token Provided!"})
//         }
//         //is cookie exist then extract the token (decode value of the cookie)
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         if(!decoded){
//             res.status(401).json({message:"Unauthorized - Invalid Token!"})
//         }

//         const user = await User.findById(decoded.userId).select("-password") //remove password from the res 

//         // to be safe not necessary
//         if(!user){
//             return res.status(404).json({message:"User not found"});
//         }
        
//         req.user = user // is user is authonticated add the user to the req then call the next function with  updated req

//         next()
        
//     } catch (error) {
//         console.log("Error in protectedRoute middleware", error.message);
//         res.status(500).json({message:"Internal Server Error!"});
        
//     }
// }


//later fixed version!!!
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.user = user;
    next(); // ✅ only reached if everything is OK
  } catch (error) {
    console.log("Error in protectedRoute middleware", error.message);
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
};

