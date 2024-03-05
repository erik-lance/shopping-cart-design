import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface StartDialogProps {
  open: boolean;
  onStart: () => void;
}

const StartDialog: React.FC<StartDialogProps> = ({ open, onStart }) => (
  <Dialog open={open}>
    <DialogTitle>Start Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Enter nickname and click &quot;Start&quot;.
      </DialogContentText>
      <TextField
        className="mt-2"
        label="Enter nickname"
        inputProps={{ "data-hj-allow": "" }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onStart}>Start</Button>
    </DialogActions>
  </Dialog>
);

export default StartDialog;
