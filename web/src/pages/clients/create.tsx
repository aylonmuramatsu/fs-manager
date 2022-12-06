import { createClientUseCase } from "@application/clients/create-client.use-case";
import { InputDefaultErrors } from "@domain/commons/input-default-errors.enum";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { mask, unMask } from "remask";

export const CreateClientPage: React.FC = () => {
  //#region Variables & Configurations
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;
  //#endregion

  //#region Methods
  const handleCancel = () => navigate("/clients", { replace: true });
  const handleGoToClient = () => navigate("/clients", { replace: true });
  const handleSave = handleSubmit(async (formData) => {
    await createClientUseCase({
      birthdate: formData.birthdate,
      cpf: formData.cpf,
      name: formData.name,
      phone: formData.phone,
      rg: formData.rg,
    });
  });

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
              <a href="javascript:;" onClick={handleGoToClient}>
                Clientes
              </a>
            </li>
            <li className=" text-zinc-400 font-semibold">
              <a href="javascript:;">Novo Cadastro</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-2 mt-4">
        <div className="tabs w-full pb-8 ">
          <a href="javascript:;" className="tab tab-bordered tab-active ">
            Dados Gerais
          </a>
          <a
            href="javascript:;"
            className={`tab tab-bordered disabled cursor-not-allowed `}
          >
            Endereço
          </a>
        </div>
        <form onSubmit={handleSave}>
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
                        onChange={(e) => {
                          onChange(
                            mask(unMask(e.target.value), ["99.999.999-S"])
                          );
                          e.target.value = mask(unMask(e.target.value), [
                            "99.999.999-S",
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
                        maxLength={17}
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
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={handleSave}
                type="button"
              >
                <div className="inline-flex items-center">
                  Cadastrar &nbsp;
                  <FaSave />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
