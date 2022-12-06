import { useLoader } from "@infra/store/zustand/useLoader";
import Loading from "react-loading";

export default function Loader(): any {
  const { loading } = useLoader();
  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-screen z-50  flex items-center justify-center">
        <div className="w-full h-full absolute bg-gray-600 opacity-60"></div>
        <div className="text-center z-50">
          <Loading
            className="mx-auto mb-4"
            type={"spinningBubbles"}
            color={"#ff8b1f"}
          />
          <div className="text-secondary font-bold font-gadugi text-xl">
            Carregando...
          </div>
        </div>
      </div>
    )
  );
}
