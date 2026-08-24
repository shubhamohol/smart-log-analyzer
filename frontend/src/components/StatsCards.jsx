const StatsCards = ({ logs }) => {
  const totalLogs = logs.length;

  const errorLogs = logs.filter(
    (log) => log.level?.toUpperCase() === "ERROR"
  ).length;

  const warningLogs = logs.filter(
    (log) => log.level?.toUpperCase() === "WARNING" ||
             log.level?.toUpperCase() === "WARN"
  ).length;

  const normalLogs = totalLogs - errorLogs - warningLogs;

  const cards = [
    {
      title: "Total Logs",
      value: totalLogs,
      icon: "📊",
    },
    {
      title: "Errors",
      value: errorLogs,
      icon: "🔴",
    },
    {
      title: "Warnings",
      value: warningLogs,
      icon: "🟡",
    },
    {
      title: "Normal",
      value: normalLogs,
      icon: "🟢",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-5 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>

            <div className="text-3xl">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;