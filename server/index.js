require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
// const connection = require("./db");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");

// database connection
// connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))


//Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, err => {
    if(err) throw err;
    console.log('Connected to DB');
})
// routes
app.use('/user', require('./routes/userRouter'));
app.use("/api", require('./routes/upload'));
app.use('/recruitment',require('./routes/recruimentRouter'))

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));