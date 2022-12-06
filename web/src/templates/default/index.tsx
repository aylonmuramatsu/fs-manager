import { useAuth } from "@infra/store/zustand/useAuth";
import { Outlet } from "react-router-dom";

export const TemplateDefault = () => {
  //#region Variables & Configurations
  const { session } = useAuth();
  //#endregion
  //#region Methods
  //#endregion
  return (
    <div className=" min-h-screen bg-zinc-200">
      <div className="w-full bg-secondary h-14 flex items-center box-border px-4 ">
        <div className="container mx-auto justify-between flex items-center">
          <span className="text-white text-xl">
            <span className="font-bold ">FS</span> Manager
          </span>

          <div className="flex items-center gap-4">
            <div className="font-bold text-white text-center">
              <div className="font-bold text-xs text-gray-300">
                {session?.name?.substring(0, 15)}
              </div>
            </div>
            <br />
            <div>
              <img
                className="cursor-pointer object-fill h-full rounded-lg w-10  h-10 "
                src="/assets/imgs/avatar.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 sm:px-0">
        <Outlet />
      </div>
    </div>
  );
};
