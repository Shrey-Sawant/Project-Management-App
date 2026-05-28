import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inflien-flex text-gree-800 rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.row.author?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.row.assignee?.username || "Unassigned",
  },
];

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onTaskClick?: (taskId: string) => void;
};

const TableView = ({ id, setIsModalNewTaskOpen, onTaskClick }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: id });

  if (isLoading) {
    return (
      <div className="px-4 xl:px-6 w-full">
        <div className="pt-5 mb-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-dark-secondary animate-pulse">
          <div className="flex bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 py-3 px-4 gap-4">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex border-b border-gray-100 dark:border-gray-800 py-4 px-4 gap-4">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-1/8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-1/8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div className="p-6">An error occurred while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
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
      <div className="cursor-pointer">
        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
          onRowClick={(params) => onTaskClick && onTaskClick(params.row._id)}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default TableView;
