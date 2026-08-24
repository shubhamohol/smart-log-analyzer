async function generateExplanation(log, anomalyResult) {
    return `The log was detected as an anomaly because ${anomalyResult.reason}. 
The log message indicates a possible system problem that should be investigated.`;
}

module.exports = {
    generateExplanation
};