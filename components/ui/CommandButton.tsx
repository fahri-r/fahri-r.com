import { Command } from "lucide-react";
import { Button } from "../utils/Button";
import { useHooks } from "@/context/Provider";

const CommandButton = ({ className, size }: any) => {
  const { setShowCommand, setShowMenu } = useHooks();

  return (
    <Button
      className={className}
      variant="ghost"
      size="icon"
      onClick={() => {
        setShowCommand(true);
        setShowMenu(false);
      }}
    >
      <Command size={size ?? 16} />
    </Button>
  );
};

export default CommandButton;
