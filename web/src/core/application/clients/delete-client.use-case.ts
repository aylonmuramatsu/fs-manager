import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import api from "@infra/services/api";
import { toast } from "react-hot-toast";

export async function deleteClientUseCase(input: DeleteClientInput) {
  try {
    updateLoadingUseCase({ state: true });
    await api.delete(`/clients/${input.clientId}`);
    toast.custom((t) => ToastDefault(t, "success", "Excluido com sucesso."));
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type DeleteClientInput = {
  clientId: number;
};
