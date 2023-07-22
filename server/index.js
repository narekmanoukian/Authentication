require('dotenv').config()
const express = require('express')
const sequelize = require("./db")
const models = require('./models/model')
const cors = require('cors')
const router = require('./routes/userRouter')
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/userRouter");

const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
  app.use("/auth", authRoute);
  
  


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


