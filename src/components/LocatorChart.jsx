import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LocatorChart({ results }) {
  const data = [
    {
      type: "ID",
      count: results.filter((r) => r.type === "ID").length,
    },
    {
      type: "CSS",
      count: results.filter((r) => r.type === "CSS").length,
    },
    {
      type: "XPath",
      count: results.filter((r) => r.type === "XPath").length,
    },
    {
      type: "Class",
      count: results.filter((r) => r.type === "Class").length,
    },
    {
      type: "Name",
      count: results.filter((r) => r.type === "Name").length,
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4">Locator Statistics</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="type" stroke="#CBD5E1" />
          <YAxis stroke="#CBD5E1" />
          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
          <Bar dataKey="count" fill="#06B6D4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LocatorChart;
