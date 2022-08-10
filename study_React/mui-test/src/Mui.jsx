import { useState } from "react";
import { Button, Snackbar, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

const Mui = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Note archived"
      />
    </Stack>
  );
};

export default Mui;
