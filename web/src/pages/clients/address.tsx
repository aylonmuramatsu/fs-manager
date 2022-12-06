import { createAddressToClientUseCase } from "@application/clients/address/create-address.use-case";
import { deleteAddressUseCase } from "@application/clients/address/delete-address.use-case";
import { getAddressByClientIdUseCase } from "@application/clients/address/get-addresses-by-client.use-case";
import { updateAddressByClientIdUseCase } from "@application/clients/address/update-address-by-client.use-case";
import updateLoadingUseCase from "@application/loader/update-loading.use-case";
import { InputDefaultErrors } from "@domain/commons/input-default-errors.enum";
import buscaCep from "@infra/services/busca-cep";
import produce from "immer";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { mask, unMask } from "remask";

enum Behavior {
  Create,
  Edit,
}
export const Address: React.FC = () => {
  //#region Variables && Configurations
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [behavior, setBehavior] = useState(Behavior.Create);
  const [currentAddress, setCurrentAddress] = useState(null);
  const { id } = useParams();
  const { control, formState, handleSubmit, setValue, reset } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;

  //#endregion

  //#region Methods
  const handleSaveAddress = handleSubmit(async (formData: any) => {
    if (behavior === Behavior.Create) {
      await createAddressToClientUseCase({
        address: {
          zipcode: formData.zipcode,
          street: formData.street,
          number: formData.number,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          complement: formData.complement,
          isMain: formData.isMain,
        },
        clientId: Number(id),
      });
      await loadAddressRegistered();
    } else if (behavior === Behavior.Edit) {
      await updateAddressByClientIdUseCase({
        address: {
          zipcode: formData.zipcode,
          street: formData.street,
          number: formData.number,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          complement: formData.complement,
          isMain: formData.isMain,
        },
        clientId: Number(id),
        addressId: Number(currentAddress),
      });
      await loadAddressRegistered();
    }
    clearFields();
    setBehavior(Behavior.Create);
    setCurrentAddress(null);
  });
  const handleCancel = () => {
    setCurrentAddress(null);
    setBehavior(Behavior.Create);
    clearFields();
  };
  const handleBlurZipcode = async (e: any) => {
    if (e.target.value.replace(/[^\d]/g, "").length < 8) return;
    try {
      updateLoadingUseCase({ state: true });
      const { data } = await buscaCep.get(
        `/${e.target.value.replace(/[^\d]/g, "")}/json`
      );
      setValue("district", data.bairro, { shouldDirty: true });
      setValue("city", data.localidade, { shouldDirty: true });
      setValue("street", data.logradouro, { shouldDirty: true });
      setValue("state", data.uf, { shouldDirty: true });
    } finally {
      updateLoadingUseCase({ state: false });
    }
  };
  const handleGoBack = () => navigate("/clients", { replace: true });
  const loadAddressRegistered = async () => {
    const data = await getAddressByClientIdUseCase({ clientId: Number(id) });
    setAddresses(
      produce(addresses, (draft: any) => {
        draft = data;
        return draft;
      })
    );
  };
  const handleEditAddress = (address: any) => {
    setBehavior(Behavior.Edit);
    setCurrentAddress(address.id);
    setValue("zipcode", mask(address.zipcode, "99999-999"));
    setValue("street", address.street);
    setValue("number", address.number);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("district", address.district);
    setValue("complement", address.complement);
    setValue("isMain", address.is_main === "Y");
  };
  const handleDeleteAddress = async (address: any) => {
    await deleteAddressUseCase({
      clientId: Number(id),
      addressId: address.id,
    });
    await loadAddressRegistered();
  };
  const clearFields = () => {
    reset(
      {
        zipcode: "",
        street: "",
        number: "",
        city: "",
        state: "",
        district: "",
        complement: "",
        isMain: "",
      },
      {
        keepDirty: false,
      }
    );
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    loadAddressRegistered();
  }, []);

  //#endregion
  return (
    <>
      <form onSubmit={handleSaveAddress}>
        <div className="row">
          <div className="col-12 lg:col-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">CEP</span>
              </label>
              <Controller
                name="zipcode"
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
                      onBlur={handleBlurZipcode}
                      onChange={(e) =>
                        onChange(mask(unMask(e.target.value), "99999-999"))
                      }
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

          <div className="col-12 lg:col-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Logradouro</span>
              </label>
              <Controller
                name="street"
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
                <span className="label-text font-semibold">Número</span>
              </label>
              <Controller
                name="number"
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

          <div className="col-12 lg:col-3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Cidade</span>
              </label>
              <Controller
                name="city"
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

          <div className="col-12 lg:col-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Bairro</span>
              </label>
              <Controller
                name="district"
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
          <div className="col-12 lg:col-7">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Complemento</span>
              </label>
              <Controller
                name="complement"
                control={control}
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
          <div className="col-12 lg:col-1">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Principal?</span>
              </label>
              <Controller
                name="isMain"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <input
                    name={name}
                    onChange={onChange}
                    type="checkbox"
                    className="toggle toggle-primary mt-2"
                    checked={value}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center w-full mt-4 justify-end">
          <div className="w-1/2 inline-flex items-center pr-2 lg:w-auto lg:pr-0">
            <button
              className="btn btn-sm btn-secondary w-full text-white"
              onClick={handleGoBack}
              type="button"
            >
              Voltar
            </button>
          </div>
          {behavior === Behavior.Edit && (
            <>
              &nbsp;
              <div className="w-1/2 inline-flex items-center pr-2 lg:w-auto lg:pr-0">
                <button
                  className="btn btn-sm btn-secondary w-full text-white"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
          &nbsp;
          <div>
            <button className="btn btn-primary btn-sm" type="submit">
              Salvar
            </button>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <h2 className="font-semibold mb-4 ">Endereços Cadastrados</h2>

      <div className="row">
        {addresses?.map((address: any) => (
          <div className=" col-12" key={address.id}>
            <div className="shadow px-4 py-6 border-2 rounded relative">
              {address.is_main === "Y" && (
                <>
                  <span className="badge badge-primary badge-xs absolute top-2">
                    Principal
                  </span>
                </>
              )}
              <div className="row">
                <p className="col-3 text-sm">
                  <b>Endereço:</b> {address.street} {address.number} <br />
                  <span>
                    <b>Complemento:</b> {address.complement}
                  </span>
                </p>
                <p className="col-3 text-sm">
                  <b>Bairro:</b> {address.district}
                </p>
                <p className="col-3 text-sm">
                  <b>Cidade:</b> {address.city}
                </p>
                <p className="col-2 text-sm">
                  <b>Estado:</b> {address.state}
                </p>
                <div className="col-1 flex items-center">
                  <button
                    className="btn btn-xs btn-primary"
                    type="button"
                    onClick={() => handleEditAddress(address)}
                  >
                    <FaEdit />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-xs bg-red-700 text-white hover:bg-red-700"
                    type="button"
                    onClick={() => handleDeleteAddress(address)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {addresses.length === 0 && (
          <div className="col-12 px-4 items-center justiyf-center">
            <div className="alert alert-warning">
              Nenhum endereço cadastrado.
            </div>
          </div>
        )}
      </div>
    </>
  );
};
