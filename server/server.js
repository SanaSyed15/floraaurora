const customerRoutes = require("./routes/customerRoutes");
const flowerRoutes = require("./routes/flowerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const pool = require("./db");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customerRoutes);
app.use("/api/flowers", flowerRoutes);

app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send("FloraAurora API is running 🌸");
});

const PORT = process.env.PORT || 5001;
pool.connect()
  .then(() => console.log("PostgreSQL Connected ✅"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
