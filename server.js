const express = require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 7000
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/productsDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log(`Connected to DB.`))
    .catch(() => console.log(err))

// Routes
app.use("/auth", require("./routes/authRouter"))
app.use("/api", expressJwt({ secret: process.env.SECRET }))

app.use("/gallery", require('./routes/productsRouter'))
app.use("/api/gallery", require('./routes/productsRouter'))

// Err handler
app.use((err, res, next) => {
    console.log(err.message)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))