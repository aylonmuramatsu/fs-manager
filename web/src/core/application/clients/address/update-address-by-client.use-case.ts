import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import api from "@infra/services/api";
import { toast } from "react-hot-toast";

export async function updateAddressByClientIdUseCase(
  input: UpdateAddressByClientIdInput
) {
  try {
    updateLoadingUseCase({ state: true });
    await api.put(
      `/clients/${input.clientId}/addresses/${input.addressId}`,
      input.address
    );
    toast.custom((t) => ToastDefault(t, "success", "Salvo com sucesso."));
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type UpdateAddressByClientIdInput = {
  address: {
    zipcode: string;
    street: string;
    number: string;
    city: string;
    district: string;
    state: string;
    complement: string;
    isMain: string;
  };
  addressId: number;
  clientId: number;
};
