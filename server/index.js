require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
const URL = process.env.MONGODB_URI || "mongodb://localhost:27017/authMern";
connection(URL);
// middlewares
app.use(express.json());
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// routes
app.use("/routes/users", userRoutes);
app.use("/routes/auth", authRoutes);
if (process.env.NODE_ENV === "production") {
  app.use("client/build");
}

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
