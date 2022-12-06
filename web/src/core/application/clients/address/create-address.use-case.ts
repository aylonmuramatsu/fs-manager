import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import api from "@infra/services/api";
import { toast } from "react-hot-toast";

export async function createAddressToClientUseCase(
  input: CreateAddressToClientInput
) {
  try {
    updateLoadingUseCase({ state: true });
    await api.post(`/clients/${input.clientId}/addresses`, input.address);
    toast.custom((t) =>
      ToastDefault(t, "success", "Endereço cadastrado com sucesso.")
    );
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type CreateAddressToClientInput = {
  address: {
    zipcode: string;
    street: string;
    number: string;
    city: string;
    district: string;
    state: string;
    complement: string;
    isMain: boolean;
  };
  clientId: number;
};
