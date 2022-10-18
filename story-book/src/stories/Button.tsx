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
  // const mode = primary
  //   ? "storybook-button--primary"
  //   : "storybook-button--secondary";
  return (
    <Button type="button" variant="contained" {...props}>
      {label}
    </Button>
  );
};
