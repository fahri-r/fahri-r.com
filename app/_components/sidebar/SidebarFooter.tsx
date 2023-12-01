import Typography from "@/app/_components/utils/Typography";

export default function SidebarFooter() {
  return (
    <div className="hidden items-center justify-between gap-2 lg:flex">
      <Typography variant="muted" className="text-xs font-medium">
        © {new Date().getFullYear()} —{" "}
        <a href="#" target="_blank" rel="noreferrer">
          <span className="duration-300 hover:text-foreground">
            made with ❤
          </span>
        </a>
      </Typography>
    </div>
  );
}
