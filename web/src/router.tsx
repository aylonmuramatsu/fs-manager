import { navigationRef } from "@infra/router/rootNavigation";
import { useAuth } from "@infra/store/zustand/useAuth";
import { ClientPage } from "@pages/clients";
import { CreateClientPage } from "@pages/clients/create";
import { EditClientPage } from "@pages/clients/edit";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { TemplateDefault } from "@templates/default";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
export default function Router() {
  navigationRef.current = {
    navigateTo: useNavigate(),
  };

  const { session } = useAuth();
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="login" />} />

      {session && (
        <>
          <Route element={<TemplateDefault />}>
            <Route path="clients">
              <Route index element={<ClientPage />} />
              <Route path="/clients/create" element={<CreateClientPage />} />
              <Route path="/clients/:id" element={<EditClientPage />} />
            </Route>
          </Route>
          <Route path="*" element={<div>Pagina não encontrada</div>} />
        </>
      )}
    </Routes>
  );
}
