import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../styles/RatingBucketChart.css";

const RatingBucketChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p className="rb-no-data">No rating bucket data available.</p>;
  }

  const formattedData = Object.entries(data)
    .map(([rating, count]) => ({
      rating,
      count,
    }))
    .sort((a, b) => parseInt(a.rating) - parseInt(b.rating));

  return (
    <div className="rb-graph-card">
      <h3 className="rb-graph-title">Problems Solved by Rating Bucket</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#ffcc00"
            barSize={30}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingBucketChart;
