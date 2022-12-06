import create from "zustand";
export type LoaderProps = {
  loading: boolean | false;
};
export const useLoader = create<LoaderProps>(() => ({
  loading: false,
}));
