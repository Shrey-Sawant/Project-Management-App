import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    "&.MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#E5E7EB" : ""}`,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1D1F21" : "white"}`,
        borderColor: `${isDarkMode ? "#2D3135" : ""}`,
      },
    },
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#A3A3A3" : ""}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#A3A3A3" : ""}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#A3A3A3" : ""}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2D3135" : "#E5E7EB"}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2D3135" : "#E5E7EB"}`,
    },
  };
};
