import React from "react";
import ResuseablePriorityPage from "../resuseablePriorityPage";
import { Priority } from "@/state/api";

const Medium = () => {
  return <ResuseablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
