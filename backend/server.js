require("dotenv").config();

const express = require("express");
const cors = require("cors");

const logRoutes = require("./routes/logRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/logs", logRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Smart Log Analyzer API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});