import React from "react";
import ResuseablePriorityPage from "../resuseablePriorityPage";
import { Priority } from "@/state/api";

const Low = () => {
  return <ResuseablePriorityPage priority={Priority.Low} />;
};

export default Low;
