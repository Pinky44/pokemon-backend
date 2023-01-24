require("dotenv").config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

const corsOption = {
  credentials: true,
  origin: CLIENT_URL,
};

module.exports = {
  PORT,
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  CLIENT_URL,
  corsOption,
};
