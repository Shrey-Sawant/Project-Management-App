import React from "react";

export const TaskCardSkeleton = () => {
  return (
    <div className="mb-4 rounded-lg bg-gray-100 dark:bg-dark-secondary p-5 border border-gray-200 dark:border-gray-800 shadow-sm animate-pulse h-44 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2.5" />
      <div className="h-3.5 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <div className="flex gap-2 mb-4">
        <div className="h-4.5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-4.5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-3.5 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3.5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-3.5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default TaskCardSkeleton;
