import Typography from "@/components/utils/Typography";
import Link from "next/link";

export default function SidebarFooter() {
  return (
    <div className="hidden items-center justify-between gap-2 lg:flex">
      <Typography variant="muted" className="text-xs font-medium">
        © {new Date().getFullYear()} with ❤ by{" "}
        <Link href={"https://github.com/fahri-r/fahri-r.com"} legacyBehavior>
          <a target="_blank" rel="noreferrer">
            <span className="duration-300 hover:text-foreground">fahri</span>
          </a>
        </Link>
      </Typography>
    </div>
  );
}
