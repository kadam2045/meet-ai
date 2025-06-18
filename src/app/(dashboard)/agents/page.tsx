import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agent-list-header";
import { AgentsView } from "@/modules/agents/ui/views/agent-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
      <AgentsListHeader />
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
    </>
  );
};

export default page;
