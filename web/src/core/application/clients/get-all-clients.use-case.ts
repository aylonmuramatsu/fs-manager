import api from "@infra/services/api";

export async function getAllClientsUseCase() {
  try {
    const { data } = await api.get("/clients");

    return data;
  } catch (err) {
    console.log(err);
  }
}
