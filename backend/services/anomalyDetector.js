function detectAnomaly(log) {
    const message = log.message.toLowerCase();
    const level = log.level.toUpperCase();

    // Rule 1: ERROR logs are considered anomalies
    if (level === "ERROR") {
        return {
            isAnomaly: true,
            severity: "HIGH",
            reason: "Log level is ERROR"
        };
    }

    // Rule 2: Check for critical keywords
    const suspiciousKeywords = [
        "failed",
        "failure",
        "exception",
        "timeout",
        "crash",
        "unauthorized"
    ];

    for (const keyword of suspiciousKeywords) {
        if (message.includes(keyword)) {
            return {
                isAnomaly: true,
                severity: "MEDIUM",
                reason: `Suspicious keyword detected: ${keyword}`
            };
        }
    }

    // Otherwise normal
    return {
        isAnomaly: false,
        severity: "LOW",
        reason: "No anomaly detected"
    };
}

module.exports = detectAnomaly;