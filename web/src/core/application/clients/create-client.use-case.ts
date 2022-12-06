import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import { navigateTo } from "@infra/router/rootNavigation";
import api from "@infra/services/api";

export async function createClientUseCase(input: CreateClientInput) {
  try {
    updateLoadingUseCase({ state: true });
    const { data } = await api.post("/clients", input);
    navigateTo(`/clients/${data.id}`, { replace: true });
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type CreateClientInput = {
  name: string;
  birthdate: Date;
  cpf: string;
  rg: string;
  phone: string;
};
