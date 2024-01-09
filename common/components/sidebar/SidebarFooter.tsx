import Typography from "@/common/components/elements/Typography";
import Link from "next/link";
import CommandButton from "../command/CommandButton";

function SidebarFooter() {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <Typography variant="muted" className="text-xs font-medium">
        © {new Date().getFullYear()} with ❤ by{" "}
        <Link href={"https://github.com/fahri-r/fahri-r.com"} legacyBehavior>
          <a target="_blank" rel="noreferrer">
            <span className="duration-300 hover:text-foreground">fahri</span>
          </a>
        </Link>
      </Typography>
      <CommandButton />
    </div>
  );
}

export default SidebarFooter;
