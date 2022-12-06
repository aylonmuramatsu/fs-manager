import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import api from "@infra/services/api";
import { toast } from "react-hot-toast";

export async function editClientUseCase(input: CreateClientInput) {
  try {
    updateLoadingUseCase({ state: true });
    await api.put(`/clients/${input.clientId}`, input.client);
    toast.custom((t) => ToastDefault(t, "success", "Salvo com sucesso."));
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type CreateClientInput = {
  client: {
    name: string;
    birthdate: Date;
    cpf: string;
    rg: string;
    phone: string;
  };
  clientId: number;
};
