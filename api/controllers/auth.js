import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

const signUp = async(req,res,next) => {

    try {
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(req.body.password, 10);
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User has been created SuccessFully"
        })

    } catch (err) {
        next(err)
    }
}


const login = async(req, res, next) => {
    try {
      const { username, email } = req.body;

      const user = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!user) {
        return next(createError(404, "User not Found"));
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return next(createError(400, "Invalid Password OR Username"));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password, ...otherDetails } = user._doc;

      const expiryDate = new Date(Date.now() + 3600000); 

      res
      .status(200)
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          expires: expiryDate,
        })
        .json({ ...otherDetails });
    } catch (err) {
        next(err)
    }
}



export { 
    signUp,
    login
}