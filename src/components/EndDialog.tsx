import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { CopyAll } from "@mui/icons-material";

interface EndDialogProps {
  open: boolean;
  timeElapsed: number;
  onTryAgain: () => void;
  incorrectItemsCount: number;
  nickname: string;
}

const EndDialog: React.FC<EndDialogProps> = ({
  open,
  timeElapsed,
  onTryAgain,
  incorrectItemsCount,
  nickname,
}) => (
  <Dialog open={open}>
    <DialogTitle>End Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>Time elapsed: {timeElapsed} seconds</DialogContentText>
      <DialogContentText>Mistakes: {incorrectItemsCount}</DialogContentText>
      <DialogContentText>
        Copy data
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(
              `${nickname}\nTime elapsed: ${timeElapsed} seconds\nMistakes: ${incorrectItemsCount}`,
            );
            alert("Data copied to clipboard");
          }}
          size="small"
        >
          <CopyAll />
        </IconButton>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onTryAgain}>Try Again</Button>
    </DialogActions>
  </Dialog>
);

export default EndDialog;
