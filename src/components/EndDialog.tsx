import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Close, CopyAll } from "@mui/icons-material";

interface EndDialogProps {
  open: boolean;
  timeElapsed: number;
  onTryAgain: () => void;
  incorrectItemsCount: number;
  nickname: string;
  configNum: string;
}

const EndDialog: React.FC<EndDialogProps> = ({
  open,
  timeElapsed,
  onTryAgain,
  incorrectItemsCount,
  nickname,
  configNum,
}) => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(
      `${nickname}\nConfig: ${configNum}\nTime elapsed: ${timeElapsed} seconds\nMistakes: ${incorrectItemsCount}`,
    );
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>End Timer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Time elapsed: {timeElapsed} seconds
          </DialogContentText>
          <DialogContentText>Mistakes: {incorrectItemsCount}</DialogContentText>
          <DialogContentText>
            Copy data
            <IconButton onClick={handleCopyButtonClick}>
              <CopyAll />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onTryAgain}>Try Again</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Data copied to clipboard"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default EndDialog;
