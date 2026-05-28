import React from "react";
import Modal from "@/components/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
};

const ModalTaskDetails = ({ isOpen, onClose, taskId }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Task Details">
      <div className="p-4">
        <p className="text-gray-600 dark:text-neutral-300">Loading details for task {taskId}...</p>
      </div>
    </Modal>
  );
};

export default ModalTaskDetails;
