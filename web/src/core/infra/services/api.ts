import ToastDefault from "@components/ToastDefault";
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.status && ![404, 400].includes(error.response.status)) {
      toast.custom((t) =>
        ToastDefault(
          t,
          "error",
          "Sem comunicação com servidor, verifique sua conexão"
        )
      );
    } else if (error.response.status === 400)
      toast.custom((t) =>
        ToastDefault(t, "error", `${error.response.data?.message}`)
      );
    else {
      toast.custom((t) =>
        ToastDefault(t, "error", `${error.response.data?.message}`)
      );

      error?.response?.data?.message.map((i: any) =>
        toast.custom((t) => ToastDefault(t, "error", `${i}`))
      );
    }
    throw error.response.data;
  }
);

export default api;
