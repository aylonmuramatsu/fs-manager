import { LoaderProps, useLoader } from "@infra/store/zustand/useLoader";
import produce from "immer";

export default function updateLoadingUseCase(input:UpdateLoadingInput){
  useLoader.setState(produce(useLoader.getState(), (draft: LoaderProps) => {
    draft.loading= input.state;
    return draft;
  })) 
}

export type UpdateLoadingInput = {
  state: boolean;
}