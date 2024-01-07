"use client";

import moment from "moment";
import Typography from "../utils/Typography";
import ExperienceProps from "@/types/experience";
export function CareerItem(props: ExperienceProps) {
  const { role, name, entry, resign } = props;

  const dateOut = resign ? new Date(resign.year, resign.month - 1) : "Present";
  const dateIn = new Date(entry.year, entry.month - 1);

  return (
    <div className="group relative flex flex-col items-center rounded-xl  border border-neutral-800 bg-neutral-900 p-2">
      <div className="relative flex w-full">
        <div className="flex w-full flex-col space-y-4 px-3 py-4">
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="font-mono text-xl text-primary">{role}</h3>
          </div>
          <Typography
            variant="muted"
            className="text-sm duration-300 flex items-center"
          >
            {name}
          </Typography>
          <Typography
            variant="muted"
            className="text-sm duration-300 flex items-center"
          >
            {moment(dateIn).format("MMM yyyy")} -{" "}
            {moment(dateOut).format("MMM yyyy")}
          </Typography>
        </div>
      </div>
    </div>
  );
}
