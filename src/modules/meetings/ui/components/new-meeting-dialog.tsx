import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "@/modules/meetings/ui/components/meeting-form";
import { useRouter } from "next/navigation";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const NewMeetingDialog = ({ open, setOpen }: Props) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      desciption="Create a new meeting"
      open={open}
      setOpen={setOpen}
    >
      <MeetingForm
        onSuccess={(id) => {
          setOpen(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => setOpen(false)}
      />
    </ResponsiveDialog>
  );
};
