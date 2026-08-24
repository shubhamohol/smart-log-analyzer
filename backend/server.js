const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const db = require("./config/db");
const logRoutes = require("./routes/logRoutes");

db.query("SELECT 1", (error) => {
    if (error) {
        console.error("MySQL connection failed:", error);
    } else {
        console.log("MySQL connected successfully");
    }
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Log Analyzer Backend is Running"
    });
});

app.use("/api/logs", logRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});