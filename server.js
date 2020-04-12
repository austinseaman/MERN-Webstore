const express = require('express')
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 7000
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb+srv://apseaman0:Coron%4012@cluster0-k9haj.mongodb.net/WebStoreDB',
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
app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))