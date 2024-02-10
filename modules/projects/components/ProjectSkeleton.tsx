import { Skeleton } from "@/common/components/elements/Skeleton";
import React from "react";

function ProjectSkeleton() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <Skeleton className="h-10 w-full md:w-64 rounded-xl" />
      <div className="flex gap-4">
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-lg" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-full" />
        <Skeleton className="h-2.5 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export default ProjectSkeleton;
