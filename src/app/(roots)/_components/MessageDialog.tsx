import React from 'react';

type MessageDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MessageDialog({ dialogOpen, setDialogOpen }: MessageDialogProps) {
  return (
    <div>MessageDialog</div>
  );
}

export default MessageDialog;
