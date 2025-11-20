import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const toastSuccess = (message) => toast.success(message);
export const toastError = (message) => toast.error(message);
export const toastInfo = (message) => toast(message);

export const showToast = (message, type = 'success') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  Toast.fire({
    icon: type,
    title: message
  });
};
