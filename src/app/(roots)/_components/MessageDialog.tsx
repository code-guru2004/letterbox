'use client'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


type MessageDialogProps = {
  dialogOpen: boolean;
  DialogOpenFunction:() => void;
};

function MessageDialog({ dialogOpen, DialogOpenFunction }: MessageDialogProps) {
  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={DialogOpenFunction}>Close</Button>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default MessageDialog;
