import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface StartDialogProps {
  open: boolean;
  onStart: () => void;
}

const StartDialog: React.FC<StartDialogProps> = ({ open, onStart }) => (
  <Dialog open={open}>
    <DialogTitle>Start Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Click {"Start"} to start the timer.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onStart}>
        Start
      </Button>
    </DialogActions>
  </Dialog>
);

export default StartDialog;