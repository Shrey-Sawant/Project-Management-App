"use client";

import { useGetTeamsQuery } from "@/state/api";
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
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Stack from "@mui/material/Stack";
import { Plus, Search, Users2 } from "lucide-react";

const CustomToolbar = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

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
          placeholder="Search teams..."
          className="rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-dark-secondary dark:text-white"
        />
      </div>
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  {
    field: "teamName",
    headerName: "Team Name",
    width: 250,
    renderCell: (params) => (
      <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white-100">
        <Users2 className="h-4 w-4 text-blue-500" />
        {params.value}
      </div>
    ),
  },
  { 
    field: "productOwnerUserName", 
    headerName: "Product Owner", 
    width: 200,
    renderCell: (params) => (
        <span className="text-gray-600 dark:text-gray-400 font-medium">
            {params.value || "N/A"}
        </span>
    )
  },
  {
    field: "productManagerUsername",
    headerName: "Project Manager",
    width: 200,
    renderCell: (params) => (
        <span className="text-gray-600 dark:text-gray-400 font-medium">
            {params.value || "N/A"}
        </span>
    )
  },
  {
    field: "_id",
    headerName: "ID",
    width: 120,
    renderCell: (params) => (
      <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
        #{params.value.toString().slice(-6)}
      </span>
    ),
  },
];

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
    </div>
  );
  
  if (isError || !teams) return (
    <div className="flex h-[80vh] w-full items-center justify-center text-red-500">
      Error loading teams.
    </div>
  );

  return (
    <div className="flex w-full flex-col p-8 transition-all duration-300">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Header name="Teams" />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Organize members and manage departmental structures.
          </p>
        </div>
        
        {/* Create Team Button */}
        <button 
          className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 active:transform active:scale-95"
          onClick={() => console.log("Create Team Clicked")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-stroke-dark dark:bg-dark-bg">
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={teams || []}
            columns={columns}
            getRowId={(row) => row._id}
            pagination
            slots={{ toolbar: CustomToolbar }}
            className={`${dataGridClassNames} border-none`}
            sx={{
              ...dataGridSxStyles(isDarkMode),
              "& .MuiDataGrid-cell": {
                borderBottom: isDarkMode ? "1px solid #2d3135" : "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: isDarkMode ? "#1d1f21" : "#f8fafc",
                color: isDarkMode ? "#e5e7eb" : "#475569",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                fontWeight: 600,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;