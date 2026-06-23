'use client'
import react from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/src/components/ui/card";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';


const MessageCard = ({message, onDelete}: {message: string, onDelete: () => void}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
