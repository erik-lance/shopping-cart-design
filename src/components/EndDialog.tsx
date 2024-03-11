import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface EndDialogProps {
  open: boolean;
  timeElapsed: number;
  onTryAgain: () => void;
  incorrectItemsCount: number;
}

const EndDialog: React.FC<EndDialogProps> = ({
  open,
  timeElapsed,
  onTryAgain,
  incorrectItemsCount,
}) => (
  <Dialog open={open}>
    <DialogTitle>End Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>Time elapsed: {timeElapsed} seconds</DialogContentText>
      <DialogContentText>Mistakes: {incorrectItemsCount}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onTryAgain}>Try Again</Button>
    </DialogActions>
  </Dialog>
);

export default EndDialog;
