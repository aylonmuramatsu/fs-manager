import { useForm, Controller } from "react-hook-form";
import { InputDefaultErrors } from "@domain/commons/input-default-errors.enum";
import { signUpUseCase } from "@application/authentication/sign-up.use-case";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { errors } = formState;

  //#region Methods
  const handleSignUp = handleSubmit(async (formData) => {
    await signUpUseCase({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      terms: formData.terms,
    });
  });
  const handleSignIn = () => navigate("/login", { replace: true });

  //#endregion

  return (
    <div className="flex flex-row justify-between min-h-screen w-full bg-white">
      <div className="w-full  lg:w-1/2 xl:w-1/2 2xl:w-1/3 mx-auto flex flex-col justify-evenly">
        <div className="sm:px-40 w-full  mx-auto">
          <h1 className="text-3xl text-center  ">Registre-se</h1>
        </div>
        <div className="w-full sm:w-1/2 mx-auto px-4">
          <form onSubmit={handleSignUp}>
            <div className="row">
              <div className="col-12">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Nome completo</span>
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
                          type="text"
                          placeholder="Informe seu nome"
                          className="input input-bordered w-full"
                          defaultValue={value}
                          onChange={onChange}
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
              <div className="col-12">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">E-mail</span>
                  </label>
                  <Controller
                    name="email"
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
                          type="text"
                          placeholder="Informe seu e-mail"
                          className="input input-bordered w-full"
                          onChange={onChange}
                          defaultValue={value}
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">Senha</span>
                  </label>
                  <Controller
                    name="password"
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
                          type="password"
                          placeholder="Informe sua senha"
                          className="input input-bordered w-full "
                          onChange={onChange}
                          defaultValue={value}
                        />
                        {errors && (
                          <label className="label">
                            <span className="label-text-alt font-bold text-red-500">
                              {errors?.[name]?.message?.toString()}
                            </span>
                          </label>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="flex justify-between items-center">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <Controller
                        name="terms"
                        control={control}
                        render={({ field: { onChange, value, name } }) => (
                          <>
                            <input
                              onChange={onChange}
                              defaultChecked={value}
                              name={name}
                              type="checkbox"
                              className="checkbox checkbox-md rounded-xs checkbox-primary "
                            />{" "}
                            &nbsp;&nbsp;
                            <span className="label-text ">
                              Eu aceito os termos e condições
                            </span>
                          </>
                        )}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <button
                  className="btn w-full btn-primary uppercase  font-bold"
                  type="submit"
                >
                  registrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="md:text-xs w-full sm:w-1/2 mx-auto px-4 sm:px-0">
          <p>
            Já possui conta? &nbsp;&nbsp;&nbsp;{" "}
            <a
              href="javascript:;"
              className="text-primary font-bold link-primary"
              onClick={handleSignIn}
            >
              entrar
            </a>
          </p>
        </div>
      </div>
      <img
        className="hidden lg:block lg:w-1/2 max-h-screen object-fill"
        src="/assets/imgs/bg.jpg"
        alt=""
      />
    </div>
  );
};
