const db = require("../config/db");
const detectAnomaly = require("../services/anomalyDetector");
const { generateExplanation } = require("../services/aiService");

const createLog = async (req, res) => {
    try {
        const { level, message, source } = req.body;

        // 1. Validate input
        if (!message) {
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
            (level, message, source, is_anomaly, severity, ai_explanation)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            level || "INFO",
            message,
            source || null,
            anomalyResult.isAnomaly,
            anomalyResult.severity,
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
                source: source || null,
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

module.exports = {
    createLog
};