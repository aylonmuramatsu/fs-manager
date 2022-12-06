import { getClientByIdUseCase } from "@application/clients/get-client-by-id.use-case";
import { InputDefaultErrors } from "@domain/commons/input-default-errors.enum";
import React, { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { mask, unMask } from "remask";
import { useNavigate, useParams } from "react-router-dom";
import { editClientUseCase } from "@application/clients/update-client.use-case";
import { Address } from "./address";
enum Tab {
  General,
  Addresses,
}

export const EditClientPage: React.FC = () => {
  //#region Variables & Configurations
  const navigate = useNavigate();
  const [tabActive, setTab] = useState(Tab.General);
  const { id } = useParams();
  const { control, formState, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;
  //#endregion

  //#region Methods
  const handleCancel = () => navigate("/clients", { replace: true });
  const handleSaveClient = handleSubmit(async (formData) =>
    editClientUseCase({
      client: {
        name: formData.name,
        birthdate: formData.birthdate,
        cpf: formData.cpf,
        rg: formData.rg,
        phone: formData.phone,
      },
      clientId: Number(id),
    })
  );
  const handleGoToClients = () => navigate("/clients", { replace: true });
  const changeTab = (tab: Tab) => setTab(tab);
  const populate = useCallback(async () => {
    const data = await getClientByIdUseCase({ clientId: Number(id) });
    setValue("name", data.name);
    setValue("birthdate", data.birthdate);
    setValue("cpf", mask(data.cpf, "999.999.999-99"));
    setValue("rg", mask(data.rg, "99.999.999-9"));
    setValue("phone", mask(data.phone, ["(99) 9999-9999", "(99) 9 9999-9999"]));
  }, [id]);
  //#endregion

  //#region Effects
  useEffect(() => {
    populate();
  }, []);
  //#endregion
  return (
    <div>
      <div className="mb-2 flex flex-col sm:flex-row">
        <div className="text-xs sm:text-sm breadcrumbs w-full mb-4 sm:mb-0">
          <ul>
            <li className=" text-zinc-400">
              <a href="javascript:;">Home</a>
            </li>
            <li className=" text-zinc-400 ">
              <a href="javascript:;" onClick={handleGoToClients}>
                Clientes
              </a>
            </li>
            <li className=" text-zinc-400 font-semibold">
              <a href="javascript:;">Edição</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-2 mt-4">
        <div className="tabs w-full pb-8 ">
          <a
            href="javascript:;"
            className={`tab tab-bordered ${
              (tabActive === Tab.General && "tab-active") || ""
            } `}
            onClick={() => changeTab(Tab.General)}
          >
            Dados Gerais
          </a>
          <a
            href="javascript:;"
            className={`tab tab-bordered ${
              (tabActive === Tab.Addresses && "tab-active") || ""
            }`}
            onClick={() => changeTab(Tab.Addresses)}
          >
            Endereço
          </a>
        </div>
        {tabActive === Tab.General && (
          <form onSubmit={handleSaveClient}>
            <div className="row">
              <div className="col-12 lg:col-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Nome</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: InputDefaultErrors.Required,
                      },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                      <>
                        <input
                          name={name}
                          defaultValue={value}
                          value={value}
                          onChange={onChange}
                          type="text"
                          className="input input-bordered w-full"
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500 ">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="col-12 lg:col-2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Data de Nascimento
                    </span>
                  </label>
                  <Controller
                    name="birthdate"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: InputDefaultErrors.Required,
                      },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                      <>
                        <input
                          name={name}
                          defaultValue={value}
                          value={value}
                          onChange={onChange}
                          type="date"
                          className="input input-bordered w-full"
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500 ">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="col-12 lg:col-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">CPF</span>
                  </label>
                  <Controller
                    name="cpf"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: InputDefaultErrors.Required,
                      },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                      <>
                        <input
                          name={name}
                          defaultValue={value}
                          value={value}
                          onChange={(e) => {
                            onChange(
                              mask(unMask(e.target.value), "999.999.999-99")
                            );
                            e.target.value = mask(
                              unMask(e.target.value),
                              "999.999.999-99"
                            );
                          }}
                          type="text"
                          className="input input-bordered w-full disabled"
                          disabled
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500 ">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="col-12 lg:col-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">RG</span>
                  </label>
                  <Controller
                    name="rg"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: InputDefaultErrors.Required,
                      },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                      <>
                        <input
                          name={name}
                          defaultValue={value}
                          value={value}
                          onChange={(e) => {
                            onChange(
                              mask(unMask(e.target.value), ["99.999.999-S"])
                            );
                            e.target.value = mask(unMask(e.target.value), [
                              "99.999.999-S",
                            ]);
                          }}
                          type="text"
                          className="input input-bordered w-full disabled"
                          disabled
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500 ">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="col-12 lg:col-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Telefone</span>
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: InputDefaultErrors.Required,
                      },
                    }}
                    render={({ field: { onChange, value, name } }) => (
                      <>
                        <input
                          name={name}
                          defaultValue={value}
                          value={value}
                          onChange={(e) => {
                            onChange(
                              mask(unMask(e.target.value), [
                                "(99) 9999-9999",
                                "(99) 9 9999-9999",
                              ])
                            );
                            e.target.value = mask(unMask(e.target.value), [
                              "(99) 9999-9999",
                              "(99) 9 9999-9999",
                            ]);
                          }}
                          type="text"
                          className="input input-bordered w-full"
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500 ">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="sm:inline-flex sm:flex-shrink-0 sm:space-x-3 w-full lg:justify-end">
              <div className="w-1/2 inline-flex items-center pr-2 lg:w-auto lg:pr-0">
                <button
                  className="btn btn-sm btn-secondary w-full text-white"
                  onClick={handleCancel}
                  type="button"
                >
                  Voltar
                </button>
              </div>
              <div className="w-1/2 inline-flex items-center pl-2 lg:w-auto lg:pl-0">
                <button className="btn btn-sm btn-primary w-full">
                  <div className="inline-flex items-center">
                    Salvar &nbsp;
                    <FaSave />
                  </div>
                </button>
              </div>
            </div>
          </form>
        )}
        {tabActive === Tab.Addresses && <Address />}
      </div>
    </div>
  );
};
