import express from "express";
import db from "./conn.js";
import router from "./routes.js";
import bodyParser from "body-parser";
const PORT = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/",router);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});