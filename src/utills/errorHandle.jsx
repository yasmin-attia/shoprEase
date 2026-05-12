import toast from "react-hot-toast";

export function errorhandeler(error) {
  const errorhandel =error.response?.data?.message || error.data || "There Is An Error ";
  toast.error(errorhandel);
}
