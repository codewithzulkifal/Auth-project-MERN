import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

const signUp = async(req,res,next) => {
    try {
        const {username, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username.toLowerCase(),
            email,
            password: hash
        })

        await newUser.save();

        res.status(201).send("User has been created")

    } catch (err) {
        next(err)
    }
}


const login = async(req, res, next) => {
    try {
        const {username, email} = req.body;

        const user = await User.findOne({
            $or: [
                {username},
                {email}
            ]
        });
        if(!user){
            return next(createError(404, "User not Found"))
        }

        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,  user.password
        );
        if (!isPasswordCorrect) {
          return next(createError(400, "Invalid Password OR Username"));
        }

        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        
        const {password, ...otherDetails} = user._doc

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
          })
          .status(200)
          .json({ ...otherDetails });


    } catch (err) {
        next(err)
    }
}



export { 
    signUp,
    login
}