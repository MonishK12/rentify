"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const InterestedDialog = ({ session, userData, customerData, creatoremail }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);


  const sendMessage = async (userData,customerData) => {
    try {
      const res = await fetch("/api/sendemail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ownerDetails: customerData,
          customerDetails:userData
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log("Email Sent");
        return true;
      } else {
        console.log("Email not sent");
        return false;
      }
     
    } catch (error) {
      console.log("Error sending email: ", error);
    }
  };
  
  const handleButtonClick = () => {
    if (!session) {
      router.push('/login'); // Redirect to login page
    } else {
      setOpen(true);
      sendMessage(userData,customerData);
    }
  };


  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-800"
        >
          <span className="pr-2 text-lg">I am interested</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-check2"
            viewBox="0 0 16 16"
          >
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
          </svg>
        </Button>
      </DialogTrigger>
      {session && (
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              We have sent the contact details to your registered mail.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="flex-1">
              <span>Name: {userData[0].firstname}</span>
            </div>
            <div className="flex-1">
              <span>Mail: {creatoremail}</span>
            </div>
            <div className="flex-1">
              <span>Number: {userData[0].phoneno}</span>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default InterestedDialog;
