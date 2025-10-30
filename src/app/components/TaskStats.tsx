"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Task } from "../../lib/types";

// カラー設定（左からTodo → In Progress → Done）
const COLORS = ["#fbbf24", "#60a5fa", "#34d399"];

export default function TaskStats({ tasks }: { tasks: Task[] }) {
  // ステータスごとの数を集計
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const total = todo + inProgress + done || 1;

  // グラフ用データ（順番固定）
  const data = [
    { name: "新規タスク", value: todo },
    { name: "進行中", value: inProgress },
    { name: "完了タスク", value: done },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        タスク進捗サマリー
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* 円グラフ */}
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) =>
                  value > 0 ? `${name} ${Math.round((value / total) * 100)}%` : ""
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}件`, name]}
                contentStyle={{ borderRadius: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 凡例（固定順で表示） */}
        <div className="flex justify-center md:flex-col gap-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full" />
            <span>新規タスク</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span>進行中</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-400 rounded-full" />
            <span>完了タスク</span>
          </div>
        </div>
      </div>
    </div>
  );
}
