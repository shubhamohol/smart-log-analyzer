const db = require("../config/db");
const detectAnomaly = require("../services/anomalyDetector");
const { generateExplanation } = require("../services/aiService");

const getLogs = async (req, res) => {
    try {
        const [logs] = await db.promise().query(
            `SELECT id, timestamp, event_type AS level, severity, source,
                    message, status_code, is_anomaly, anomaly_score,
                    anomaly_reason, ai_explanation, ai_root_cause,
                    ai_next_step, created_at
             FROM logs
             ORDER BY id DESC`
        );

        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({
            message: "Failed to fetch logs"
        });
    }
};

const createLog = async (req, res) => {
    try {
        const { level, message, source } = req.body;

        // 1. Validate input
        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Log message is required"
            });
        }

        // 2. Detect anomaly using our own implementation
        const anomalyResult = detectAnomaly({
            level: level || "INFO",
            message,
            source
        });

        let aiExplanation = null;

        // 3. Ask AI for explanation only if anomaly exists
        if (anomalyResult.isAnomaly) {
            aiExplanation = await generateExplanation(
                {
                    level,
                    message,
                    source
                },
                anomalyResult
            );
        }

        // 4. Save result in MySQL
        const sql = `
            INSERT INTO logs
            (timestamp, event_type, severity, source, message, is_anomaly, ai_explanation)
            VALUES (NOW(), ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            level || "INFO",
            anomalyResult.severity,
            source || "frontend",
            message,
            anomalyResult.isAnomaly,
            aiExplanation
        ];

        const [result] = await db.promise().query(sql, values);

        // 5. Return response
        res.status(201).json({
            success: true,
            message: "Log added successfully",
            log: {
                id: result.insertId,
                level: level || "INFO",
                message,
                source: source || "frontend",
                isAnomaly: anomalyResult.isAnomaly,
                severity: anomalyResult.severity,
                reason: anomalyResult.reason,
                aiExplanation
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const deleteLog = async (req, res) => {
    const logId = Number(req.params.id);

    if (!Number.isInteger(logId) || logId < 1) {
        return res.status(400).json({
            message: "A valid log ID is required"
        });
    }

    try {
        const [result] = await db.promise().query(
            "DELETE FROM logs WHERE id = ?",
            [logId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Log not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting log:", error);
        res.status(500).json({
            message: "Failed to delete log"
        });
    }
};

module.exports = {
    createLog,
    deleteLog,
    getLogs
};