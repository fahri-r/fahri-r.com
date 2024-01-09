import { Command } from "lucide-react";
import Button from "../elements/Button";
import { useHooks } from "@/common/context/Provider";

function CommandButton({ className, size }: any) {
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
}

export default CommandButton;
