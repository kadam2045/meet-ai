import { AgentsView } from "@/modules/agents/ui/views/agent-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary
        fallback={
          <ErrorState
            title="fetcing agent failed"
            description="try again later"
          />
        }
      >
        <Suspense
          fallback={
            <LoadingState
              title="Loading agent"
              description="it takes few second..."
            />
          }
        >
          <AgentsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default page;
