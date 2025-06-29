"use client";

import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

//icons
import { VideoIcon } from "lucide-react";

//components
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GenerateAvatar } from "@/components/ui/generate-avtar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc?.agents?.getOne?.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    ` This will remove ${data?.meetingCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutate({ id: agentId });
  };
  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        setOpen={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data?.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-6 flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <GenerateAvatar
                variant="botttsNeutral"
                seed={data?.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data?.name}</h2>
            </div>

            <Badge
              variant="outline"
              className=" flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-600" />
              {data?.meetingCount}{" "}
              {data.meetingCount > 1 ? "Meetings" : "Meeting"}
            </Badge>

            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Insturction</p>
              <p className="text-neutral-800">{data?.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentIdViewLoding = () => {
  return (
    <LoadingState title=" Loading agent" description="it takes few second..." />
  );
};

export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="fetcing agent failed"
      description="Something went wrong"
    />
  );
};
