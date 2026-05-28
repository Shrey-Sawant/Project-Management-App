import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import TaskCardSkeleton from "@/components/TaskCard/TaskCardSkeleton";

type BoradProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onTaskClick?: (taskId: string) => void;
};

const taskStauts = ["To Do", "In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen, onTaskClick }: BoradProps) => {
  const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: id });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: string, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 p-4 xl:p-6">
        {taskStauts.map((status) => (
          <div key={status} className="rounded-lg py-2">
            <div className="mb-3 flex w-full">
              <div className="w-2 rounded-s-lg bg-gray-200 dark:bg-gray-800" />
              <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
                <h3 className="text-md font-semibold dark:text-white">{status}</h3>
              </div>
            </div>
            <div className="space-y-3">
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="p-6">An error occurred while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 p-4 xl:p-6">
        {taskStauts.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: string, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onTaskClick?: (taskId: string) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
  onTaskClick,
}: TaskColumProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const columnTasks = tasks.filter((task) => task.status === status);
  const taskCount = columnTasks.length;

  const statusColor: { [key: string]: string } = {
    "To Do": "#2563EB",
    "In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 transition-colors duration-200 ${isOver ? "bg-blue-50 dark:bg-neutral-900" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-2 rounded-s-lg"
          style={{ background: statusColor[status] }}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h3 className="text-md flex items-center font-semibold dark:text-white">
            {status}
            <span
              className="dark:bg-dark-tertiary ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-xs leading-none font-bold"
              style={{ width: "1.5rem", height: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center justify-center h-6 w-5 text-gray-500 hover:text-gray-700 dark:text-neutral-500">
              <EllipsisVertical size={20} />
            </button>
            <button
              className="dark:bg-dark-tertiary flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {taskCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-lg text-gray-400 dark:text-neutral-500 mx-1 my-2">
          <svg className="h-7 w-7 mb-2 stroke-current opacity-70" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-[11px] font-medium">No tasks here · Click + to add one</span>
        </div>
      ) : (
        columnTasks.map((task) => (
          <Task key={task._id} task={task} onTaskClick={onTaskClick} />
        ))
      )}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
  onTaskClick?: (taskId: string) => void;
};

const Task = ({ task, onTaskClick }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const completedSubtasks = task.subtasks ? task.subtasks.filter((s) => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
  const numderOfComments = (task.comments && task.comments.length) || 0;

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

  const priorityBorder: Record<string, string> = {
    Urgent: "border-l-4 border-red-500",
    High: "border-l-4 border-orange-400",
    Medium: "border-l-4 border-blue-400",
    Low: "border-l-4 border-gray-400",
    Backlog: "border-l-4 border-gray-300",
  };

  const leftBorder = task.priority ? priorityBorder[task.priority] || "border-l-4 border-gray-200" : "border-l-4 border-gray-200";

  const renderDueDate = (dueDateString?: string) => {
    if (!dueDateString) return null;
    const dueDate = new Date(dueDateString);
    const now = new Date();
    
    const dDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const dToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = dDate.getTime() - dToday.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = format(dueDate, "P");
    
    if (diffDays < 0) {
      return (
        <span className="text-red-500 font-semibold flex items-center gap-1.5 text-[10px]">
          <span>{formattedDate}</span>
          <span className="rounded bg-red-100 dark:bg-red-900/30 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-red-700 dark:text-red-300">Overdue</span>
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="text-orange-500 font-semibold flex items-center gap-1.5 text-[10px]">
          <span>{formattedDate}</span>
          <span className="rounded bg-orange-100 dark:bg-orange-900/30 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Due Today</span>
        </span>
      );
    } else if (diffDays === 1) {
      return (
        <span className="text-yellow-600 dark:text-yellow-500 font-semibold text-[10px]">
          {formattedDate} (Due Tomorrow)
        </span>
      );
    } else {
      return <span className="text-gray-500 dark:text-gray-400 text-[10px]">{formattedDate}</span>;
    }
  };

  const ProrityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        priority === "Urgent"
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          : priority === "High"
            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
            : priority === "Medium"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              : priority === "Low"
                ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      onClick={() => onTaskClick && onTaskClick(task._id)}
      className={`dark:bg-dark-secondary mb-4 rounded-md bg-white shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 ${leftBorder} ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachment && task.attachment.length > 0 && (
        <Image
          src={`/${task.attachment[0].fileUrl!}`}
          alt={task.attachment[0].fileName}
          width={400}
          height={200}
          className="h-32 w-full object-cover rounded-t-md"
        />
      )}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {task.priority && <ProrityTag priority={task.priority} />}
            {totalSubtasks > 0 && (
              <div className="rounded-full bg-blue-50 dark:bg-blue-950 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:text-blue-300">
                {completedSubtasks}/{totalSubtasks} ✓
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 text-[10px] text-blue-600 dark:text-blue-400 font-medium"
                >
                  {tag.trim()}
                </div>
              ))}
            </div>
          </div>
          <button className="justify-center flex h-6 w-4 flex-shrink-0 items-center text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-gray-300">
            <EllipsisVertical size={20} />
          </button>
        </div>

        <div className="my-2.5 flex justify-between items-start gap-2">
          <h4 className="text-sm font-bold dark:text-white leading-tight">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-[10px] font-bold rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 dark:text-white flex-shrink-0">
              {task.points} pts
            </div>
          )}
        </div>

        {task.description && (
          <p className="text-xs text-gray-500 dark:text-neutral-400 mb-3 line-clamp-2"
             dangerouslySetInnerHTML={{ __html: task.description }}
          />
        )}

        <div className="my-3 flex flex-wrap items-center justify-between">
          <div className="text-[10px] text-gray-400 flex flex-col gap-0.5">
            {formattedStartDate && (
              <span>Start: {formattedStartDate}</span>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <span>Due:</span>
                {renderDueDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>

        <div className="dark:border-stroke-dark mt-4 border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex -space-x-1.5 overflow-hidden">
            {task.assignee ? (
              task.assignee.profilePictureUrl ? (
                <Image
                  key={task.assignee.id || task.assignee.email}
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username || ""}
                  width={24}
                  height={24}
                  className="dark:border-dark-secondary h-6 w-6 rounded-full border border-white object-cover"
                />
              ) : (
                <div
                  key={task.assignee.id || task.assignee.email}
                  className={`h-6 w-6 rounded-full border border-white dark:border-dark-secondary flex items-center justify-center text-[10px] font-bold text-white uppercase ${getAvatarColor(task.assignee.username || "U")}`}
                >
                  {(task.assignee.username || "U").charAt(0)}
                </div>
              )
            ) : null}
            {task.author && task.author.profilePictureUrl && (
              <Image
                key={task.author.id || task.author.email}
                src={`/${task.author.profilePictureUrl}`}
                alt={task.author.username || ""}
                width={24}
                height={24}
                className="dark:border-dark-secondary h-6 w-6 rounded-full border border-white object-cover"
              />
            )}
          </div>
          <div className="flex items-center text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-gray-300">
            <MessageSquareMore size={16} />
            <span className="ml-1 text-xs font-medium">
              {numderOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
