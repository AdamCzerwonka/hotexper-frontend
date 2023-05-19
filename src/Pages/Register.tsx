import { A, useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { createStore } from "solid-js/store";
import FormInput from "../Components/FormInput";

interface RegisterFormFields {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  password2: string;
}

const Register: Component = () => {
  const navigate = useNavigate();
  const [form, setForm] = createStore<RegisterFormFields>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
  });

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  const submitRegister = async (data: RegisterFormFields) => {
    const response = await fetch("http://localhost:5062/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      return response.text();
    }

    return response.json();
  };

  const onSubmit = (event: Event) => {
    event.preventDefault();
    const dataToSend: RegisterFormFields = {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      password: form.password,
      password2: form.password2,
    };

    console.log(dataToSend);

    submitRegister(dataToSend).then((res) => {
      if (res) {
        console.log(res);
      } else {
        navigate("success", { replace: false });
      }
    });
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center h-screen place-items-center  mx-auto">
        <form
          onsubmit={onSubmit}
          class="container flex flex-col border-2 border-black dark:border-slate-400 p-10 max-w-md"
        >
          <h1 class="text-5xl text-center pb-10">Register</h1>
          <FormInput
            Value={form.firstName}
            Label="First name"
            updateFunc={() => updateFormField("firstName")}
          />

          <FormInput
            Value={form.lastName}
            Label="Last name"
            updateFunc={() => updateFormField("lastName")}
          />

          <FormInput
            Value={form.phoneNumber}
            Label="Phone number"
            updateFunc={() => updateFormField("phoneNumber")}
          />

          <FormInput
            Value={form.email}
            Label="Email address"
            updateFunc={() => updateFormField("email")}
          />

          <FormInput
            Value={form.password}
            Label="Password"
            updateFunc={() => updateFormField("password")}
          />
          <FormInput
            Value={form.password2}
            Label="Repeat passowrd"
            updateFunc={() => updateFormField("password2")}
          />
          <button
            type="submit"
            class="border-4 border-red-500 p-2.5 text-lg font-bold"
          >
            Register
          </button>
          <A class="mt-4 hover:text-slate-400" href="/login">
            Already have an account?
          </A>
        </form>
      </div>
    </>
  );
};

export default Register;
