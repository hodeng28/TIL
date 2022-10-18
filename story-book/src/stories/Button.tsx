import React from "react";
import { Button } from "@mui/material";
import "./button.css";

interface ButtonProps {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

export const StyledButton = ({
  color,
  variant,
  label,
  ...props
}: ButtonProps) => {
  return (
    <Button type="button" color={color} variant={variant} {...props}>
      {label}
    </Button>
  );
};
