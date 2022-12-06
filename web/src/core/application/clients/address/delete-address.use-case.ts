import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import api from "@infra/services/api";
import { toast } from "react-hot-toast";

export async function deleteAddressUseCase(input: DeleteAddressInput) {
  try {
    updateLoadingUseCase({ state: true });
    await api.delete(`/clients/${input.clientId}/addresses/${input.addressId}`);
    toast.custom((t) => ToastDefault(t, "success", "Excluido com sucesso."));
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type DeleteAddressInput = {
  addressId: number;
  clientId: number;
};
