import { useState } from "react";
import { addLog } from "../services/api";

const LogForm = ({ onLogAdded }) => {
  const [level, setLevel] = useState("INFO");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validate message
    if (!message.trim()) {
      setError("Please enter a log message.");
      return;
    }

    try {
      setLoading(true);

      const newLog = {
        level: level,
        message: message.trim(),
      };

      console.log("Sending log:", newLog);

      await addLog(newLog);

      // Clear form after successful submission
      setMessage("");
      setLevel("INFO");

      // Refresh dashboard
      if (onLogAdded) {
        await onLogAdded();
      }

    } catch (error) {
      console.error("Error adding log:", error);
      setError("Failed to add log. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      <h3 className="text-2xl font-bold text-slate-800">
        Add New Log
      </h3>

      <p className="mt-1 text-slate-500">
        Add a log for analysis
      </p>

      <form onSubmit={handleSubmit} className="mt-6">

        {/* Log Level */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Log Level
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        {/* Log Message */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Log Message
          </label>

          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
            }}
            placeholder="Example: Database connection failed"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Adding Log..." : "Add Log"}
        </button>

      </form>
    </div>
  );
};

export default LogForm;