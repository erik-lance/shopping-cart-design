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
} from "@mui/material";

interface StartDialogProps {
  open: boolean;
  onStart: () => void;
  goalItems: CartItemObject[];
}

const StartDialog: React.FC<StartDialogProps> = ({
  open,
  onStart,
  goalItems,
}) => (
  <Dialog open={open}>
    <DialogTitle>Start Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Task Code: {generateTaskCode(goalItems)}
      </DialogContentText>
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
