import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

import TaskCardSkeleton from "@/components/TaskCard/TaskCardSkeleton";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onTaskClick?: (taskId: string) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen, onTaskClick }: Props) => {
  const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: id });

  if (isLoading) {
    return (
      <div className="px-4 xl:px-6">
        <div className="pt-5 mb-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <TaskCardSkeleton />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </div>
      </div>
    );
  }
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="bg-blue-primary rounded flex items-center px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task._id} task={task} onClick={() => onTaskClick && onTaskClick(task._id)} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
