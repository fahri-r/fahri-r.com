import { Toaster } from "react-hot-toast";

type ToastMessageProps = {
  title: string;
  message: string;
};

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

const ToastMessage = (props: ToastMessageProps) => {
  const { title, message } = props;

  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <div className="text-sm text-neutral-400">{message}</div>
    </div>
  );
};

export { Toast, ToastMessage };
