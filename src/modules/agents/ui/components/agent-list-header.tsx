"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [openAgentModel, setOpenAgentModel] = useState(false);
  return (
    <>
      <NewAgentDialog open={openAgentModel} setOpen={setOpenAgentModel} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h1>My Agents</h1>
          <Button onClick={() => setOpenAgentModel(true)}>
            <PlusIcon />
            Add Agents
          </Button>
        </div>
      </div>
    </>
  );
};
