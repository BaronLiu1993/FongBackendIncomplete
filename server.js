const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');


routes(app);

app.use(bodyParser.json());
let corsOptions = {
    origin: "http://localhost:5173" //For Dealing With CORS
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Testing");
});

const db = require("./models");

db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
    
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





