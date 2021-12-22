const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const corsOption = {
  origin: "http://localhost:8100",
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Dropped an resync db");
});

const PORT = 3000;

require("./routes/user.routes")(app);
require("./routes/game.routes")(app);
require("./routes/category.routes")(app);
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
