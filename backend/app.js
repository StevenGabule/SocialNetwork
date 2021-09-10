const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express();
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connect'))
  .catch(err => {
    console.log("DB Error: " + err)
  })

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use(cookieParser())

const postRouter = require('./routes/post')
const authRouter = require('./routes/auth')

app.use('/api/v1', postRouter)
app.use('/api/v1', authRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  dotenv.config()
  console.log(`App is running on ${PORT}`)
})
