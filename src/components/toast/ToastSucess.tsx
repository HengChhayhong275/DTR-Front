import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const ToastSucess = (message: string) => {
    toast.success(`${message}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
}
