"use client";
import React from "react";
import { Alert } from "@heroui/alert";

type SuccessAlertProps = {
  title?: string;
  description?: string;
  isVisible: boolean;
  onClose: () => void;
};

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  title = "Success Notification",
  description = "Content Added Successfully",
  isVisible,
  onClose,
}) => {
  return (
    isVisible && (
      <Alert
        color="success"
        description={description}
        isVisible={isVisible}
        title={title}
        variant="faded"
        onClose={onClose}
      />
    )
  );
};
