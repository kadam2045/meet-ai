import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const NewAgentDialog = ({ open, setOpen }: Props) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      desciption="Create a new agent"
      open={open}
      setOpen={setOpen}
    >
      <AgentForm
        onSuccess={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </ResponsiveDialog>
  );
};
