import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import api from "@infra/services/api";

export async function getAddressByClientIdUseCase(input: GetClientByIdInput) {
  try {
    updateLoadingUseCase({ state: true });

    const { data } = await api.get(`/clients/${input.clientId}/addresses`);

    return data;
  } finally {
    updateLoadingUseCase({ state: false });
  }
}

type GetClientByIdInput = {
  clientId: number;
};
