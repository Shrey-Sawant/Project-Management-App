import React from "react";
import ResuseablePriorityPage from "../resuseablePriorityPage";
import { Priority } from "@/state/api";

const Backlog = () => {
  return <ResuseablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
