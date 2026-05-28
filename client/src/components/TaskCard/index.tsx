import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
  onClick?: () => void;
};

const TaskCard = ({ task, onClick }: Props) => {
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const completedSubtasks = task.subtasks ? task.subtasks.filter((s) => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

  const priorityBorder: Record<string, string> = {
    Urgent: "border-l-4 border-red-500",
    High: "border-l-4 border-orange-400",
    Medium: "border-l-4 border-blue-400",
    Low: "border-l-4 border-gray-400",
    Backlog: "border-l-4 border-gray-300",
  };

  const leftBorder = task.priority ? priorityBorder[task.priority] || "border-l-4 border-gray-200" : "border-l-4 border-gray-200";

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-emerald-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const renderDueDate = (dueDateString?: string) => {
    if (!dueDateString) return <span className="text-gray-400 dark:text-neutral-500">No due date</span>;
    const dueDate = new Date(dueDateString);
    const now = new Date();
    
    const dDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const dToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = dDate.getTime() - dToday.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = format(dueDate, "P");
    
    if (diffDays < 0) {
      return (
        <span className="text-red-500 font-semibold flex items-center gap-1">
          <span>{formattedDate}</span>
          <span className="rounded bg-red-100 dark:bg-red-900/30 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700 dark:text-red-300">Overdue</span>
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="text-orange-500 font-semibold flex items-center gap-1">
          <span>{formattedDate}</span>
          <span className="rounded bg-orange-100 dark:bg-orange-900/30 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Due Today</span>
        </span>
      );
    } else if (diffDays === 1) {
      return (
        <span className="text-yellow-600 dark:text-yellow-500 font-semibold">
          {formattedDate} (Due Tomorrow)
        </span>
      );
    } else {
      return <span className="text-gray-500 dark:text-gray-400">{formattedDate}</span>;
    }
  };

  const priorityColor: Record<string, string> = {
    Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Low: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    Backlog: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  };

  return (
    <div
      onClick={onClick}
      className={`dark:bg-dark-secondary mb-3 rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${leftBorder} dark:text-white`}
    >
      {task.attachment && task.attachment.length > 0 && (
        <div className="mb-3 overflow-hidden rounded-md">
          <Image
            src={`/${task.attachment[0].fileUrl!}`}
            alt={task.attachment[0].fileName}
            width={400}
            height={200}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {task.priority && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityColor[task.priority] || ""}`}>
              {task.priority}
            </span>
          )}
          {totalSubtasks > 0 && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 dark:bg-blue-950 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
              {completedSubtasks}/{totalSubtasks} ✓
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-400 font-mono">#{task._id.slice(-6)}</span>
      </div>

      <h4 className="text-md font-bold mb-1 dark:text-white">{task.title}</h4>
      
      {task.description && (
        <p className="text-xs text-gray-600 dark:text-neutral-400 mb-3 line-clamp-2"
           dangerouslySetInnerHTML={{ __html: task.description }}
        />
      )}

      {taskTagsSplit.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {taskTagsSplit.map((tag) => (
            <span key={tag} className="rounded bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {task.assignee ? (
            <div className="flex items-center gap-1.5">
              {task.assignee.profilePictureUrl ? (
                <Image
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username || "assignee"}
                  width={24}
                  height={24}
                  className="rounded-full h-6 w-6 object-cover border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase ${getAvatarColor(task.assignee.username || "U")}`}>
                  {(task.assignee.username || "U").charAt(0)}
                </div>
              )}
              <span className="text-gray-700 dark:text-gray-300 font-medium">{task.assignee.username}</span>
            </div>
          ) : (
            <span className="text-gray-400 dark:text-neutral-500 italic">Unassigned</span>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Due Date</span>
          {renderDueDate(task.dueDate)}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
