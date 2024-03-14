import React from "react";
import { CartItemObject } from "./CartItem";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Close, CopyAll } from "@mui/icons-material";

interface StartDialogProps {
  open: boolean;
  onStart: () => void;
  goalItems: CartItemObject[];
  setNickname: (nickname: string) => void;
}

const StartDialog: React.FC<StartDialogProps> = ({
  open,
  onStart,
  goalItems,
  setNickname,
}) => {
  const [nicknameInput, setNicknameInput] = React.useState("");
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(event.target.value);
    setNickname(event.target.value);
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(generateTaskCode(goalItems));
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Start Timer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy task code
            {/* Copy button */}
            <IconButton onClick={handleCopyButtonClick} size="small">
              <CopyAll />
            </IconButton>
          </DialogContentText>
          <DialogContentText>
            Enter nickname and click &quot;Start&quot;.
          </DialogContentText>
          <TextField
            className="mt-2"
            label="Enter nickname"
            inputProps={{ "data-hj-allow": "" }}
            value={nicknameInput}
            onChange={handleNicknameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onStart}>Start</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Task code copied to clipboard"
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

function generateTaskCode(goalItems: CartItemObject[]): string {
  // Generate a task code from the goal items
  // e.g.: "I2Q7I3Q5I1Q2"
  // Where:
  // I = Item ID
  // Q = Quantity
  let taskCode = "";
  goalItems.forEach((item) => {
    taskCode += `I${item.id}Q${item.quantity}`;
  });
  return taskCode;
}

export default StartDialog;
