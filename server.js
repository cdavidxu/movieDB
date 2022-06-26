const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:3001"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Testing" });
});
//1. the require statement returns a functions which we pass the express app object to
require("./routes/routes.js")(app);
const PORT = process.env.PORT || 3000;
//2. we use app(router middleware) to listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});