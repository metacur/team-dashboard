// タスク状態を定義
export type TaskStatus = "todo" | "in-progress" | "done";

// 担当者の型
export interface Assignee {
  name: string;   // 名前
  avatar?: string; // 将来的にアイコンも対応可
}

// タスク型
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee?: Assignee; // 担当者
  dueDate?: string;    // 期限 (ISO文字列)
}
