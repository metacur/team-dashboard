"use client";

import { useState } from "react";
import { Task } from "../../lib/types";
import TaskColumn from "./TaskColumn";
import TaskStats from "./TaskStats";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [members, setMembers] = useState<string[]>(["山田", "佐藤", "鈴木"]);
  const [newMember, setNewMember] = useState("");

  // モーダル開閉
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: uuidv4(),
      title: newTask,
      status: "todo",
      assignee: assignee ? { name: assignee } : undefined,
      dueDate: dueDate || undefined,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
    setAssignee("");
    setDueDate("");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setTasks((prev) => {
      const task = prev.find((t) => t.id === draggableId);
      if (!task) return prev;
      task.status = destination.droppableId as Task["status"];
      return [...prev];
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-50 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
        チームのタスク管理
      </h1>

      {/* 統計グラフ */}
      <TaskStats tasks={tasks} />

      {/* タスク追加フォーム */}
      <div className="flex flex-wrap justify-center items-end gap-4 bg-white shadow-md rounded-2xl p-6 mt-8 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">タスク名</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="新しいタスク..."
            className="border rounded-lg p-2 w-64 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">担当者</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="border rounded-lg p-2 w-40 shadow-sm focus:ring-2 focus:ring-blue-400"
          >
            <option value="">未選択</option>
            {members.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">期限</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          追加
        </button>

        {/* メンバー管理ボタン */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          メンバー管理
        </button>
      </div>

      {/* カンバンボード */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            droppableId="todo"
            title="📝 新規タスク"
            color="border-amber-400"
            tasks={tasks.filter((t) => t.status === "todo")}
            onDelete={deleteTask}
            onEdit={editTask}
          />
          <TaskColumn
            droppableId="in-progress"
            title="🚧 進行中タスク"
            color="border-blue-400"
            tasks={tasks.filter((t) => t.status === "in-progress")}
            onDelete={deleteTask}
            onEdit={editTask}
          />
          <TaskColumn
            droppableId="done"
            title="✅ 完了タスク"
            color="border-emerald-400"
            tasks={tasks.filter((t) => t.status === "done")}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </DragDropContext>

      {/* モーダル（チームメンバー管理） */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              👥 チームメンバー管理
            </h3>

            {/* メンバー一覧 */}
            <div className="flex flex-col gap-2 mb-3 max-h-48 overflow-y-auto">
              {members.map((m) => (
                <div
                  key={m}
                  className="flex justify-between items-center bg-gray-50 rounded p-2"
                >
                  <span>{m}</span>
                  <button
                    onClick={() =>
                      setMembers((prev) => prev.filter((x) => x !== m))
                    }
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {members.length === 0 && (
                <p className="text-gray-400 text-sm">メンバーがいません</p>
              )}
            </div>

            {/* 新規メンバー追加 */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="新しいメンバー..."
                className="border rounded-lg p-2 flex-1 shadow-sm focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={() => {
                  if (newMember.trim() && !members.includes(newMember.trim())) {
                    setMembers((prev) => [...prev, newMember.trim()]);
                    setNewMember("");
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
              >
                追加
              </button>
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
