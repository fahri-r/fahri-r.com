import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          border: "1px solid #333",
          background: "#222",
          color: "#fff",
          fontSize: "15px",
        },
      }}
    />
  );
};

export default Toast;
