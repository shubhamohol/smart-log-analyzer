const express = require("express");
const {
  createLog,
  deleteLog,
  getLogs,
} = require("../controllers/logController");

const router = express.Router();

// GET /api/logs
router.get("/", getLogs);

// POST /api/logs
router.post("/", createLog);

// DELETE /api/logs/:id
router.delete("/:id", deleteLog);

module.exports = router;