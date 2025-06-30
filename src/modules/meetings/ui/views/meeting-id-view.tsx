"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useState } from "react";
import { MeetingIdViewHeader } from "../components/meeting-id-view-headr";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { ProcessingState } from "../components/processing-state";
import { CancelledState } from "../components/cancelled-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeetings = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        //todo: invalidate free tier usage

        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    ` This will remove ${data?.name} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeetings.mutate({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isProcessing = data.status === "processing";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        setOpen={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data?.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        {isActive && <ActiveState meetingId={meetingId} />}
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isCancelled && <CancelledState />}
        {isCompleted && <div>Completed</div>}
      </div>
    </>
  );
};

export const MeetingIdViewLoding = () => {
  return (
    <LoadingState
      title="Loading meeting"
      description="it takes few second..."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="fetcing meeting failed"
      description="Something went wrong"
    />
  );
};
