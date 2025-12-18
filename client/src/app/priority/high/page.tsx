import React from "react";
import ResuseablePriorityPage from "../resuseablePriorityPage";
import { Priority } from "@/state/api";

const High = () => {
  return <ResuseablePriorityPage priority={Priority.High} />;
};

export default High;
