"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon, XIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { AgentSearchFilter } from "./agent-search-filter";
import { useAgentFilter } from "../../hooks/use-agent-filter";

export const AgentsListHeader = () => {
  const [openAgentModel, setOpenAgentModel] = useState(false);
  const [filter, setFilter] = useAgentFilter();

  const isAnyFilterModified = !!filter.search;
  console.log("isAnyFilterModified", isAnyFilterModified);

  const clearFilter = () => {
    setFilter({
      search: "",
      page: 1,
    });
  };
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

        <div className="p-2 flex items-center gap-x-4">
          <AgentSearchFilter />

          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={clearFilter}>
              Clear
              <XCircleIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
