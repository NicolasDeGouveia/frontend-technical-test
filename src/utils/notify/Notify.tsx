import { ToastContainer, toast, Zoom } from "react-toastify";

export const notifyMsgSuccess = (msg: string) => toast.success(msg);
export const notifyMsgError = (msg: string) => toast.error(msg);
export const notifyMsgWarning = (msg: string) => toast.warn(msg);

export const Notify = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
    </>
  );
};
