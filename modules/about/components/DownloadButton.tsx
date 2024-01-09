"use client";

import { useRef } from "react";

import toast from "react-hot-toast";

import { Button } from "../../../common/components/elements/Button";
import { Download } from "lucide-react";
import { ToastMessage } from "../../../common/components/elements/Toast";

const DownloadButton = () => {
  return (
    <a
      href="/Muhamad Fahri Ramadhan Resume.pdf"
      download
      onClick={() =>
        toast.success(
          <ToastMessage
            title="Download"
            message="Resume downloaded successfully."
          />
        )
      }
    >
      <Button variant="dark" size="lg" className="flex items-center gap-2">
        <Download size={16} />
        Download Resume
      </Button>
    </a>
  );
};

export { DownloadButton };
