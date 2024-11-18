const express = require("express");
const userRoutes = require('./routes/users')
const cors = require("cors")
const app = express();

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(userRoutes)

const connectDb = require('./database/connection')
connectDb()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});





