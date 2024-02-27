import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface EndDialogProps {
  open: boolean;
  timeElapsed: number;
  onTryAgain: () => void;
}

const EndDialog: React.FC<EndDialogProps> = ({ open, timeElapsed, onTryAgain }) => (
  <Dialog open={open}>
    <DialogTitle>End Timer</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Time elapsed: {timeElapsed} seconds
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onTryAgain}>
        Try Again
      </Button>
    </DialogActions>
  </Dialog>
);

export default EndDialog;