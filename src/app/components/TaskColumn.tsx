import { Task } from "../../lib/types";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

export default function TaskColumn({
  droppableId,
  title,
  color,
  tasks,
  onDelete,
  onEdit,
}: {
  droppableId: string;
  title: string;
  color: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`bg-white rounded-xl shadow-md p-4 border-t-4 ${color} min-h-[320px] transition`}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-8">タスクなし</p>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
}
