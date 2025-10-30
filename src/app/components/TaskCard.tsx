"use client";

import { Task } from "../../lib/types";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function TaskCard({
  task,
  index,
  onDelete,
  onEdit,
}: {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEdit = () => {
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-md flex flex-col hover:shadow-lg transition"
        >
          {/* タイトル編集 */}
          <div className="flex justify-between items-center mb-1">
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                className="border rounded px-2 py-1 flex-1 mr-2 text-sm"
                autoFocus
              />
            ) : (
              <span className="font-medium text-gray-800">{task.title}</span>
            )}

            {/* 編集・削除ボタン */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-blue-500 hover:text-blue-700 font-bold text-sm"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 担当者・期限 */}
          {task.assignee && (
            <p className="text-xs text-gray-600 mt-1">👤 {task.assignee.name}</p>
          )}
          {task.dueDate && (
            <p className="text-xs text-gray-500">📅 期限: {task.dueDate}</p>
          )}
        </div>
      )}
    </Draggable>
  );
}
