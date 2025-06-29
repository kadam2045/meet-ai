"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/column";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />

      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to join the call"
        />
      )}
    </div>
  );
};

export const MeetingsViewLoding = () => {
  return (
    <LoadingState
      title=" Loading meetings"
      description="it takes few second..."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="fetcing meetings failed"
      description="Something went wrong"
    />
  );
};
