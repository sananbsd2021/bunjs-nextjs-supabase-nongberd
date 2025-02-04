"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const supabase = createClient();

const RealtimeStatisticsPage = () => {
  const [weeklyData, setWeeklyData] = useState<number[]>([]);
  const [monthlyData, setMonthlyData] = useState<number[]>([]);
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [monthlyLabels, setMonthlyLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = async () => {
    try {
      // Fetch weekly data
      const { data: weekly, error: weeklyError } = await supabase.rpc("weekly_statistics");
      if (weeklyError) throw weeklyError;

      // Fetch monthly data
      const { data: monthly, error: monthlyError } = await supabase.rpc("monthly_statistics");
      if (monthlyError) throw monthlyError;

      // Parse data
      const weekLabels = weekly.map((entry: any) => entry.day.trim());
      const weekData = weekly.map((entry: any) => entry.count);

      const monthLabels = monthly.map((entry: any) => entry.week);
      const monthData = monthly.map((entry: any) => entry.count);

      setWeeklyLabels(weekLabels);
      setWeeklyData(weekData);

      setMonthlyLabels(monthLabels);
      setMonthlyData(monthData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchStatistics();

    // Realtime subscription
    const subscription = supabase
      .channel("students_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "students" },
        () => {
          // Re-fetch statistics on data change
          fetchStatistics();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Bar chart for weekly data
  const weeklyChartData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: "Weekly Data",
        data: weeklyData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line chart for monthly data
  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Data",
        data: monthlyData,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.2,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Realtime Statistics</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Weekly Statistics</h2>
        <Bar data={weeklyChartData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Monthly Statistics</h2>
        <Line data={monthlyChartData} />
      </div>
    </div>
  );
};

export default RealtimeStatisticsPage;
