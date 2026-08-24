import { useState } from "react";
import { createLog } from "../services/api";

const LogForm = ({ onLogAdded }) => {
  const [level, setLevel] = useState("INFO");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a log message.");
      return;
    }

    try {
      setLoading(true);

      await createLog({
        level,
        message,
      });

      setMessage("");
      setLevel("INFO");

      onLogAdded();

    } catch (error) {
      console.error(error);
      alert("Failed to create log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">
        Add New Log
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Add a log for analysis
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-5 space-y-4"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Log Level
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="INFO">INFO</option>
            <option value="WARNING">WARNING</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Log Message
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Example: Database connection failed"
            rows="4"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Log"}
        </button>
      </form>
    </div>
  );
};

export default LogForm;