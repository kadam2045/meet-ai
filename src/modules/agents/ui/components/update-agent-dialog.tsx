import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export const UpdateAgentDialog = ({ open, setOpen, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      desciption="Edit the agent details"
      open={open}
      setOpen={setOpen}
    >
      <AgentForm
        onSuccess={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
