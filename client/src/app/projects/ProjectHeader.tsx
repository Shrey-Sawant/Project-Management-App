import Header from "@/components/Header";
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./ModalNewProject";
import { useGetProjectsQuery } from "@/state/api";

type Props = {
  id: string;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader: React.FC<Props> = ({ id, activeTab, setActiveTab }) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const { data: projects } = useGetProjectsQuery();

  const currentProject = projects?.find((p) => p._id === id);
  const projectName = currentProject ? currentProject.name : "Loading Project...";

  return (
    <div className="px-4 xl:px-6 pt-5">
      {/* BREADCRUMB HEADER */}
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span className="hover:text-blue-600 cursor-pointer transition-colors">Projects</span>
        <span>&gt;</span>
        <span className="font-semibold text-gray-700 dark:text-gray-200">{projectName}</span>
        <span>&gt;</span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold">{activeTab}</span>
      </div>

      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-4 lg:pb-3 flex items-center justify-between">
        <Header
          name={projectName}
          buttonComponent={
            <button
              className="bg-blue-primary flex items-center rounded-md px-3 py-2 text-white hover:bg-blue-600 transition-colors text-sm"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-4 w-4" /> New Boards
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border-b border-gray-200 pt-2 pb-0 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-4.5 w-4.5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-4.5 w-4.5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-4.5 w-4.5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-4.5 w-4.5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        
        <div className="flex items-center gap-4 py-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 transition-colors">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-dark-secondary dark:bg-dark-secondary rounded-md border border-gray-300 dark:border-gray-700 py-1 pr-4 pl-8 text-sm focus:outline-none dark:text-white"
            />
            <Grid3X3 className="absolute top-2 left-2.5 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`flex items-center gap-2 px-1 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 sm:px-2 lg:px-4 ${
        isActive
          ? "border-blue-500 text-blue-600 font-bold dark:text-white"
          : "border-transparent text-gray-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white"
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
