const LogTable = ({ logs }) => {

  const getLevelStyle = (level) => {
    switch (level?.toUpperCase()) {
      case "ERROR":
        return "bg-red-100 text-red-700";

      case "WARNING":
      case "WARN":
        return "bg-yellow-100 text-yellow-700";

      case "INFO":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200">

      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-800">
          System Logs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Recent application logs
        </p>
      </div>

      {logs.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No logs available.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold">
                  ID
                </th>

                <th className="px-5 py-4 text-sm font-semibold">
                  Level
                </th>

                <th className="px-5 py-4 text-sm font-semibold">
                  Message
                </th>

                <th className="px-5 py-4 text-sm font-semibold">
                  Timestamp
                </th>
              </tr>
            </thead>

            <tbody>

              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-5 py-4 text-sm">
                    #{log.id}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getLevelStyle(
                        log.level
                      )}`}
                    >
                      {log.level}
                    </span>
                  </td>

                  <td className="max-w-md px-5 py-4 text-sm text-slate-700">
                    {log.message}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default LogTable;