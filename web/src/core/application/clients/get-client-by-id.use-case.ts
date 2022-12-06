import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import api from "@infra/services/api";

export async function getClientByIdUseCase(input: GetClientByIdInput) {
  try {
    updateLoadingUseCase({ state: true });

    const { data } = await api.get(`/clients/${input.clientId}`);
    updateLoadingUseCase({ state: false });

    return data;
  } catch (err) {
    console.log(err);
  }
}

type GetClientByIdInput = {
  clientId: number;
};
