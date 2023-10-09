import {toast} from "react-toastify";

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    case "error":
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    default:
      break;
  }
};
