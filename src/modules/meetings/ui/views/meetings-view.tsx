"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <div>{JSON.stringify(data)}</div>;
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
