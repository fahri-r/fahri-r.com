import { Command } from "lucide-react";
import { Button } from "../utils/Button";
import { useHooks } from "@/context/Provider";

const CommandButton = ({ className }: any) => {
  const { setShowCommand } = useHooks();

  return (
    <Button
      className={className}
      variant="ghost"
      size="icon"
      onClick={() => setShowCommand(true)}
    >
      <Command size={16} />
    </Button>
  );
};

export default CommandButton;
