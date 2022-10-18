import React from "react";
import { Button } from "@mui/material";
import "./button.css";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export const StyledButton = ({
  primary = false,
  variant,
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <Button type="button" variant={variant} {...props}>
      {label}
    </Button>
  );
};
