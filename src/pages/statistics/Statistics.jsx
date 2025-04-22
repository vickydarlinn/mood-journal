import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/common/Card";
import { getEntries } from "../../lib/storage";
import {
  format,
  parseISO,
  subMonths,
  subWeeks,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const MOOD_COLORS = {
  happy: "#FEC6A1",
  sad: "#D3E4FD",
  angry: "#FFDEE2",
  calm: "#E5DEFF",
  neutral: "#F1F0FB",
};

const Statistics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const entries = getEntries();
  const now = new Date();

  const filteredEntries = entries.filter(({ date }) => {
    const entryDate = parseISO(date);
    if (timeRange === "week")
      return isWithinInterval(entryDate, { start: subWeeks(now, 1), end: now });
    if (timeRange === "month")
      return isWithinInterval(entryDate, {
        start: startOfMonth(now),
        end: endOfMonth(now),
      });
    if (timeRange === "3months")
      return isWithinInterval(entryDate, {
        start: subMonths(now, 3),
        end: now,
      });
    return true;
  });

  const moodCounts = filteredEntries.reduce(
    (acc, { mood }) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    },
    { happy: 0, sad: 0, angry: 0, calm: 0, neutral: 0 },
  );

  const pieChartData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
  }));

  const mostRecentEntry = entries.at(-1);
  const mostCommonMood =
    Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Mood Statistics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border-input bg-background text-foreground focus:ring-ring h-10 w-40 rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          <option value="week">Past Week</option>
          <option value="month">This Month</option>
          <option value="3months">Past 3 Months</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((_, i) => (
                  <Cell key={i} fill={Object.values(MOOD_COLORS)[i % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entries Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Total Entries</h3>
            <p className="text-3xl font-bold">{entries.length}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Most Recent Entry</h3>
            <p>
              {mostRecentEntry?.date ? (
                <>{format(parseISO(mostRecentEntry.date), "MMMM d, yyyy")}</>
              ) : (
                "No entries yet"
              )}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Most Common Mood</h3>
            <p className="capitalize">
              {entries.length ? mostCommonMood : "No entries yet"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
