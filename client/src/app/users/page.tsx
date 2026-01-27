"use client";

import { useGetUsersQuery } from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Stack from "@mui/material/Stack";
import { Search } from "lucide-react";

const CustomToolbar = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Common styling logic for the toolbar buttons
  const buttonSlotProps = {
    button: {
      sx: {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: isDarkMode ? "#d1d5db" : "#4b5563",
        textTransform: "none",
        padding: "4px 12px",
        borderRadius: "6px",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: isDarkMode ? "#2d3135" : "#f3f4f6",
          color: "#3b82f6",
        },
      },
    },
  };

  return (
    <GridToolbarContainer className="flex items-center justify-between border-b border-gray-200 bg-white p-4 transition-colors dark:border-stroke-dark dark:bg-dark-bg">
      <Stack direction="row" spacing={1}>
        <GridToolbarFilterButton slotProps={buttonSlotProps} />
        <GridToolbarExport slotProps={buttonSlotProps} />
      </Stack>

      <div className="relative flex items-center text-gray-400 transition-colors focus-within:text-blue-500">
        <Search className="absolute ml-3 h-4 w-4" />
        <input
          type="text"
          placeholder="Search users..."
          className="rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-dark-secondary dark:text-white"
        />
      </div>
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
        #{params.value.toString().slice(-6)}
      </span>
    ),
  },
  {
    field: "profilePictureUrl",
    headerName: "User",
    width: 280,
    renderCell: (params) => (
      <div className="flex h-full items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 dark:border-gray-800 dark:ring-gray-700">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold leading-tight text-gray-800 dark:text-white-100">
            {params.row.username}
          </span>
          <span className="text-xs text-gray-500">Team Member</span>
        </div>
      </div>
    ),
  },
  {
    field: "username",
    headerName: "Handle",
    width: 180,
    renderCell: (params) => (
      <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        @{params.value.toLowerCase()}
      </span>
    ),
  },
];

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return (
      <div className="flex h-[80vh] w-full flex-col items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 animate-pulse text-sm text-gray-500">
          Loading workspace users...
        </p>
      </div>
    );

  if (isError || !users)
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/10">
          <p className="font-medium text-red-600 dark:text-red-400">
            Unable to load users
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm underline opacity-70 hover:opacity-100"
          >
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex w-full flex-col p-8 transition-all duration-300 ease-in-out">
      <div className="mb-8">
        <Header name="Users" />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your team directory and view member profiles.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-stroke-dark dark:bg-dark-bg">
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={users || []}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            slots={{
              toolbar: CustomToolbar,
            }}
            className={`${dataGridClassNames} border-none`}
            sx={{
              ...dataGridSxStyles(isDarkMode),
              "& .MuiDataGrid-cell": {
                borderBottom: isDarkMode
                  ? "1px solid #2d3135"
                  : "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDarkMode ? "#1d1f21" : "#f8fafc",
                color: isDarkMode ? "#e5e7eb" : "#475569",
                borderBottom: isDarkMode
                  ? "1px solid #2d3135"
                  : "1px solid #e2e8f0",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.025em",
                fontWeight: 600,
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: isDarkMode
                  ? "1px solid #2d3135"
                  : "1px solid #e2e8f0",
                backgroundColor: isDarkMode ? "#1d1f21" : "#f8fafc",
              },
            }}
            getRowClassName={() =>
              "hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors cursor-pointer"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Users;