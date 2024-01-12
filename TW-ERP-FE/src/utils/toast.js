import { toast } from "react-toastify";
import { error, success } from "./appConstant";

export const toastMessage = ({ type, message }) => {
  switch (type) {
    case success:
      return toast.success(message);
    case error:
      return toast.error(message);
    default:
      return;
  }
};
