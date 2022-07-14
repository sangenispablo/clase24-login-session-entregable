require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// mongo
const { dbConnection } = require("./database/config");

// rutas
const webRouter = require("./routes/webRouter");

// env port
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("src/public"));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CNN_LOCAL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    key: "user_sid",
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// mis rutas
app.use("/", webRouter);

// conecto a Mongo
dbConnection();

// start server
app.listen(PORT, () => {
  console.log(`API esta escuchando el puerto: ${PORT}`);
});
