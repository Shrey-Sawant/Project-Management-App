import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="dark:bg-dark-secondary mb-3 rounded bg-white p-4 shadow dark:text-white">
      {task.attachment && task.attachment.length > 0 && (
        <div>
          <strong>Attachements:</strong>
          <div className="felx flex-wrap">
            {task.attachment && task.attachment.length > 0 && (
              <Image
                src={`/${task.attachment[0].fileUrl!}`}
                alt={task.attachment[0].fileName}
                width={400}
                height={200}
                className="rounded-t-md"
              />
            )}
          </div>
        </div>
      )}
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>ID:</strong> {task._id}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Title:</strong> {task.title}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Description:</strong>{" "}
          {task.description || "No Description Provided"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Priority:</strong> {task.priority}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Tags:</strong> {task.tags || "No Tags Provided"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Start Date:</strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not Set"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not Set"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Author:</strong>{" "}
          {task.author ? task.author.username : "Unknown"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Assignee:</strong>{" "}
          {task.assginee ? task.assginee.username : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
