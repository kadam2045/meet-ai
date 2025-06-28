"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader = () => {
  const [openMeetingModel, setOpenMeetingModel] = useState(false);
  return (
    <>
      <NewMeetingDialog open={openMeetingModel} setOpen={setOpenMeetingModel} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1>My Meetings</h1>
          <Button onClick={() => setOpenMeetingModel(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
      </div>
    </>
  );
};
