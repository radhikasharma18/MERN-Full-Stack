'use client'
import react from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from './ui/alert-dialog';
import axios from 'axios';
import { toast } from 'sonner';



type MessageCardProps = {
  message: { _id: string };
  onDelete: (message: { _id: string }) => void;
};
const MessageCard = ({message, onDelete}: {message: { _id: string }, onDelete: (message: { _id: string }) => void}) => {
  const router = useRouter();
  const handleDelete = async() => {
    const response = await axios.delete<{ Response: string }>(`/api/delete-message/${message._id}`);       
    toast.success(response.data.Response);
    onDelete({ _id: message._id as string });
    
  }
  return (
    <Card>
      <CardHeader> 
        <CardTitle>Message</CardTitle>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="ml-4">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>                    
                        This action cannot be undone. This will permanently delete your message.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button variant="outline" onClick={() => router.refresh()}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <p>{message._id}</p>
      </CardContent>
      <CardFooter>
       <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
