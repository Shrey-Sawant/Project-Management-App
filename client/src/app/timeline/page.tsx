"use client";

import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode, Task } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import Header from "@/components/Header";

const Timeline: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks: Task[] = useMemo(() => {
    if (!projects) return [];

    return projects.map((project) => {
      const startDate = project.startDate
        ? new Date(project.startDate)
        : new Date();

      const endDate = project.endDate
        ? new Date(project.endDate)
        : new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      return {
        id: project._id,
        name: project.name,
        start: startDate,
        end: endDate,
        type: "project",
        progress: 50,
        isDisabled: false,
      };
    });
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !projects)
    return <div>Error while fetching projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Project Timeline" />
        <div className="relative w-64">
          <select
            className="w-full rounded border border-gray-400 bg-white px-4 py-2 dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary">
        <Gantt
          tasks={ganttTasks}
          {...displayOptions}
          columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
          listCellWidth="100px"
          projectBackgroundColor={isDarkMode ? "#101214" : "#1F2937"}
          projectProgressColor={isDarkMode ? "#1F2937" : "#AEB8C2"}
          projectProgressSelectedColor={isDarkMode ? "#000000" : "#9BA1A6"}
        />
      </div>
    </div>
  );
};

export default Timeline;
