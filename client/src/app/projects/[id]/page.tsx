"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "../BoardView";
import List from "../ListView";
import Timeline from "../TimelienView";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";
import ModalTaskDetails from "@/components/ModalTaskDetails";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isModalTaskDetailsOpen, setIsModalTaskDetailsOpen] = useState(false);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalTaskDetailsOpen(true);
  };

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      
      {isModalTaskDetailsOpen && selectedTaskId && (
        <ModalTaskDetails
          isOpen={isModalTaskDetailsOpen}
          onClose={() => {
            setIsModalTaskDetailsOpen(false);
            setSelectedTaskId(null);
          }}
          taskId={selectedTaskId}
        />
      )}

      <ProjectHeader id={id} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} onTaskClick={handleTaskClick} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} onTaskClick={handleTaskClick} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} onTaskClick={handleTaskClick} />
      )}
    </div>
  );
};

export default Project;
