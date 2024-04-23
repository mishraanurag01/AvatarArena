import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
import UserGameProfile from '../models/userGameProfile.js';
import GameProfile from '../models/gameProfile.js';

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      console.log(user);
      res.status(409).send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(200).send({ "status": "success", "message": "Registration Success", "token": token })
            console.log("registration success!!")
          } catch (error) {
            console.log(error)
            res.status(401).send({ "status": "failed", "message": "Unable to Register" })
            console.log("Unable to register!!")
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
          console.log("Password and Confirm Password doesn't match")
        }
      } else {
        res.status(422).send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            console.log("token:", token);
            res.status(200).send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.status(406).send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.status(400).send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.status(422).send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:5500/frontend/?id=${user._id}&token=${token}`
        console.log(link)
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email", "info": info })
      } else {
        res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }

  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
      jwt.verify(token, new_secret)
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
        } else {
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.send({ "status": "success", "message": "Password Reset Successfully" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }

  static CreateUserProfile = async (req, res) => {
    try {
      const { userId, gameUserId, name, username, homeState, country, dob, game, role, status, team } = req.body;
  
      // Check if UserGameProfile document exists for the user
      let userProfile = await UserGameProfile.findOne({ user: userId });
  
      if (!userProfile) {
        // If UserGameProfile document does not exist, create a new one
        userProfile = new UserGameProfile({ user: userId, gameProfiles: [] });
      }
  
      // Check if game profile already exists for the user
      const existingGameProfile = await GameProfile.findOne({ username });
  
      if (existingGameProfile) {
        // If game profile exists, update it
        await existingGameProfile.updateOne({ name, username, homeState, country, dob, game, role, status, team });
      } else {
        // If game profile does not exist, create a new one
        const newGameProfile = new GameProfile({ gameUserId, name, username, homeState, country, dob, game, role, status, team });
        await newGameProfile.save();
        // Push the new game profile's ObjectId to the user's gameProfiles array
        userProfile.gameProfiles.push(newGameProfile._id);
      }
  
      // Save the UserGameProfile document
      await userProfile.save();
      console.log({ message: 'Game profile saved successfully'});
      res.status(201).json({ message: 'Game profile saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController