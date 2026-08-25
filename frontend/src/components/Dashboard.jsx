import { useCallback, useEffect, useState } from "react";
import { deleteLog, getLogs } from "../services/api";

import StatsCards from "./StatsCards";
import LogForm from "./LogForm";
import LogTable from "./LogTable";

const Dashboard = () => {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getLogs();

      setLogs(data);
    } catch (error) {
      console.error("Error loading logs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadTimer = setTimeout(loadLogs, 0);

    return () => clearTimeout(loadTimer);
  }, [loadLogs]);

  const handleLogDeleted = async (id) => {
    await deleteLog(id);
    setLogs((currentLogs) => currentLogs.filter((log) => log.id !== id));
  };



  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <nav className="bg-slate-900 text-white shadow-lg">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold">
              Smart Log Analyzer
            </h1>

            <p className="text-xs text-slate-400">
              Intelligent Log Monitoring System
            </p>
          </div>

          <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
            ● System Online
          </div>

        </div>

      </nav>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor, analyze and detect anomalies in your application logs.
          </p>

        </div>

        {/* Statistics */}

        <StatsCards logs={logs} />

        {/* Form */}

        <div className="mt-8">

          <LogForm onLogAdded={loadLogs} />

        </div>

        {/* Logs */}

        <div className="mt-8">

          {loading ? (
            <div className="rounded-xl bg-white p-10 text-center">
              Loading logs...
            </div>
          ) : (
            <LogTable logs={logs} onLogDeleted={handleLogDeleted} />
          )}

        </div>

      </main>

    </div>
  );
};

export default Dashboard;