import React from "react";
import ResuseablePriorityPage from "../resuseablePriorityPage";
import { Priority } from "@/state/api";

const Urgent = () => {
  return <ResuseablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
