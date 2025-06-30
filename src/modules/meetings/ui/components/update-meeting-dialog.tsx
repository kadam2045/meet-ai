import { ResponsiveDialog } from "@/components/responsive-dialog";

import { MeetingGetOne } from "../../types";
import { MeetingForm } from "./meeting-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
export const UpdateMeetingDialog = ({
  open,
  setOpen,
  initialValues,
}: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      desciption="Edit the meeting details"
      open={open}
      setOpen={setOpen}
    >
      <MeetingForm
        onSuccess={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

// here you can add router push for after save  will stay in that id page
