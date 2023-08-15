import { Navigate } from "@solidjs/router";
import { Component, Show, createSignal } from "solid-js";
import { fetchToken } from "../Services/LoginService";
import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { Input, email, minLength, object, string } from "valibot";
import { useAuth } from "../Store/Auth";

const LoginSchemaObject = object({
  email: string([
    minLength(1, "Please enter your email"),
    email("The email address is badly formatted"),
  ]),
  password: string([
    minLength(1, "Please enter your password."),
    minLength(8, "You password must have 8 characters or more."),
  ]),
});

type LoginSchema = Input<typeof LoginSchemaObject>;

const LoginPage: Component = () => {
  const [, { Form, Field }] = createForm<LoginSchema>({
    validate: valiForm(LoginSchemaObject),
  });
  const [errorMsg, setErrorMsg] = createSignal("");
  const [data, { login }] = useAuth();

  const handleSubmit: SubmitHandler<LoginSchema> = (values, event) => {
    fetchToken(values)
      .then((res) => {
        if (res.token) {
          login(res.token);
        }

        if (res.error) {
          setErrorMsg(res.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Show when={!data.isLoggedIn} fallback={<Navigate href={"/"} />}>
      <div class="flex flex-col items-center justify-center h-screen place-items-center mx-auto">
        <div class="container flex flex-col border-2 border-black dark:border-slate-400 p-10 max-w-md">
          <h1 class="text-5xl text-center pb-10">Login</h1>
          <Show when={errorMsg()}>
            <p class="border-4 border-red-600 rounded bg-red-400 p-2 mb-4 dark:text-black">
              {errorMsg()}
            </p>
          </Show>
          <Form onSubmit={handleSubmit} class="flex flex-col gap-3">
            <Field name="email">
              {(field, props) => (
                <div class="flex flex-col">
                  <input
                    id={field.name}
                    {...props}
                    class="border-red-500 border-2 p-2 dark:bg-slate-800"
                    type="email"
                  />
                  <label for={field.name} class="text-sm dark:text-slate-400">
                    Email
                  </label>
                  {field.error && <span>{field.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {(field, props) => (
                <div class="flex flex-col">
                  <input
                    id={field.name}
                    {...props}
                    class="border-red-500 border-2 p-2 dark:bg-slate-800"
                    type="password"
                  />
                  <label for={field.name} class="text-sm dark:text-slate-400">
                    Password
                  </label>
                  {field.error && <span>{field.error}</span>}
                </div>
              )}
            </Field>
            <button
              class="border-4 border-red-500 p-2.5 text-lg font-bold"
              type="submit"
            >
              Login
            </button>
            <div>
              <span>Forgot password</span>
            </div>
          </Form>
        </div>
      </div>
    </Show>
  );
};

export default LoginPage;
