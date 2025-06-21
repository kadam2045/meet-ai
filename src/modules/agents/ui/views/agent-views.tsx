"use client";

import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { columns } from "../components/column";
import { DataTable } from "../components/data-table";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilter } from "../../hooks/use-agent-filter";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {
  const trpc = useTRPC();
  const [filter, setFilter] = useAgentFilter();
  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filter,
    })
  );
  console.log("data", data);

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filter.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilter({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description=" Create an agent to join meetings. Each agent will follor our instruction and can interact with participants during the call."
        />
      )}
    </div>
  );
};
