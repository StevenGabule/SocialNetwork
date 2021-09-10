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

const postRouter = require('./routes/postRouter')
const authRouter = require('./routes/authRouter')
const profileRouter = require('./routes/profileRouter')
const userRouter = require('./routes/userRouter')
const {requireSignIn} = require("./middleware/requireSignIn");

app.use('/api/v1', authRouter)
app.use('/api/v1', requireSignIn, postRouter)
app.use('/api/v1', requireSignIn, userRouter)
app.use('/api/v1', requireSignIn, profileRouter)

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
  next()
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  dotenv.config()
  console.log(`App is running on ${PORT}`)
})
