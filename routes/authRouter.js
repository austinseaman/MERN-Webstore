const express = require('express')
const authRouter = express.Router()
const User = require("../models/user.js")
const jwt = require('jsonwebtoken')



authRouter.post("/signup", (req, res, next) => {
    //does user by that username exist
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user !== null) {
            res.status(400)
            return next(new Error("You're fricked. Username in use by another user that likes that name."))
        }

        const newUser = new User(req.body)

        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            // generate a token
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            //send response that includes user info & token
            return res.status(201).send({ user: savedUser.toObject(), token })
        })
    })
})

authRouter.post("/login", (req, res, next) => {
    // Does user exist
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }

        // Does user exist
        if (!user) {
            res.status(400)
            return next(new Error("Username or Password es no bueno!"))
        }

        // Does pw match saved pw?
        if (user.password !== req.body.password) {
            res.status(401)
            return next(new Error("Username or Password es no bueno!"))
        }

        const token = jwt.sign(user.toObject(), process.env.SECRET)

        return res.status(200).send({ user: user.toObject(), token })
    })
})







module.exports = authRouter