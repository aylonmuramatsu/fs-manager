import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import ToastDefault from "@components/ToastDefault";
import { navigateTo } from "@infra/router/rootNavigation";
import api from "@infra/services/api";
import { useAuth } from "@infra/store/zustand/useAuth";
import produce from "immer";
import { toast } from "react-hot-toast";

export async function signUpUseCase(input: SignUpInput) {
  try {
    updateLoadingUseCase({ state: true });
    if (!input.terms) {
      return toast.custom((t) =>
        ToastDefault(
          t,
          "info",
          "Para prosseguir com seu cadastro, é necessário aceitar os termos."
        )
      );
    }
    const { data } = await api.post(`/authentication/sign-up`, {
      name: input.name,
      email: input.email,
      password: input.password,
    });

    useAuth.setState(
      produce(useAuth.getState(), (draft) => {
        draft.session = data.user;
        draft.token = data.token;
        return draft;
      })
    );

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    toast.custom((t) =>
      ToastDefault(t, "success", `Bem-vindo(a) ${data?.user?.name}`)
    );
    navigateTo("/clients");
  } finally {
    updateLoadingUseCase({ state: true });
  }
}

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};
