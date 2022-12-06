import { useForm, Controller } from "react-hook-form";
import { InputDefaultErrors } from "@domain/commons/input-default-errors.enum";
import { useNavigate } from "react-router-dom";
import { signInUseCase } from "@application/authentication/sign-in.use-case";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { errors } = formState;

  //#region Methods
  const handleSignUp = () => navigate("/register");
  const handleSignIn = handleSubmit(async (formData) => {
    await signInUseCase({
      email: formData.email,
      password: formData.password,
    });
  });

  //#endregion

  return (
    <div className="flex flex-row justify-between min-h-screen w-full bg-white">
      <div className="w-full  lg:w-1/2 xl:w-1/2 2xl:w-1/3 mx-auto flex flex-col justify-evenly">
        <div className="sm:px-40 w-full  mx-auto">
          <h1 className="text-3xl text-center  ">Acessar</h1>
        </div>
        <div className="w-full sm:w-1/2 mx-auto px-4">
          <form onSubmit={handleSignIn}>
            <div className="row">
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
                          defaultValue={value}
                          onChange={onChange}
                          type="text"
                          placeholder="informe seu e-mail"
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
                          defaultValue={value}
                          onChange={onChange}
                          type="password"
                          placeholder="informe sua senha"
                          className="input input-bordered w-full "
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
                <div className="flex justify-between items-center ">
                  <div className="">
                    <a href="#" className="text-primary text-xs lg:text-base">
                      Esqueci minha senha
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <button
                  className="btn w-full btn-primary uppercase"
                  type="submit"
                >
                  Acessar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="md:text-xs w-full sm:w-1/2 mx-auto px-4 sm:px-0">
          <p>
            Não possui conta? &nbsp;&nbsp;&nbsp;{" "}
            <a
              href="javascript:;"
              className="text-primary font-bold link-primary"
              onClick={handleSignUp}
            >
              cadastrar
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
