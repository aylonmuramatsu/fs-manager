import create from "zustand";

export type SessionProps = {
  name: string;
  id: string;
};

export type AuthProps = {
  session: SessionProps | null;
  token: string | null;
};

export const useAuthInitial = {
  session: null,
  token: null,
};

export const useAuth = create<AuthProps>(() => useAuthInitial);
