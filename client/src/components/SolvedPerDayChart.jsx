import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/SolvedPerDayChart.css";

const SolvedPerDayChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p className="spdc-no-data">No problem solving data available.</p>;
  }

  const chartData = Object.entries(data)
    .map(([date, count]) => ({
      date,
      solved: count,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="spdc-chart-container">
      <h3 className="spdc-chart-title">Solved Per Day</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            minTickGap={20}
            tickFormatter={(tick) =>
              new Date(tick).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "2-digit",
              })
            }
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            labelFormatter={(label) =>
              `Date: ${new Date(label).toLocaleDateString("en-IN")}`
            }
            formatter={(value) => [`${value} problems`, "Solved"]}
          />
          <Line
            type="monotone"
            dataKey="solved"
            stroke="#007bff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SolvedPerDayChart;
