"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";

import { NewMeetingDialog } from "./new-meeting-dialog";
import { MeetingSearchFilter } from "./meeting-search-filter";

import { useMeetingFilter } from "../../hooks/use-meeting-filter";

import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsListHeader = () => {
  const [openMeetingModel, setOpenMeetingModel] = useState(false);
  const [filter, setFilter] = useMeetingFilter();

  const isAnyFilterModified =
    !!filter.search || !!filter.status || !!filter.agentId;

  const clearFilter = () => {
    setFilter({
      search: "",
      page: DEFAULT_PAGE,
      status: null,
      agentId: "",
    });
  };

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

        <ScrollArea>
          <div className="p-2 flex items-center gap-x-4">
            <MeetingSearchFilter />

            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={clearFilter}>
                Clear
                <XCircleIcon />
              </Button>
            )}
            <StatusFilter />
            <AgentIdFilter />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
