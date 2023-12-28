"use client";

import { useRef } from "react";

import toast from "react-hot-toast";

import { Button } from "../utils/Button";
import { Download } from "lucide-react";

const DownloadButton = () => {
  const downloadRef = useRef<any>();

  return (
    <a
      href="/Muhamad Fahri Ramadhan Resume.pdf"
      download
      onClick={
        () => {}
        // toast.success(
        //   <ToastMessage
        //     title="Instalado"
        //     message="Currículo baixado com sucesso."
        //   />
        // )
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
