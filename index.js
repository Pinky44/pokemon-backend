const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT, DB_URL, corsOption } = require("./config");
const router = require("./src/routers/index");
const errorMiddleware = require("./src/middlewares/error-middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
