import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { createStore } from "solid-js/store";

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
          class="container flex flex-col border-2 border-black p-10 max-w-md"
        >
          <h1 class="text-5xl text-center pb-10">Register</h1>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.firstName}
              oninput={updateFormField("firstName")}
              type="text"
            />
            <label class="text-sm">First name</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.lastName}
              oninput={updateFormField("lastName")}
              type="text"
            />
            <label class="text-sm">Last name</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.phoneNumber}
              oninput={updateFormField("phoneNumber")}
              type="text"
            />
            <label class="text-sm">Telephone number</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.email}
              oninput={updateFormField("email")}
              type="email"
            />
            <label class="text-sm">Email</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.password}
              oninput={updateFormField("password")}
              type="password"
              autocomplete="new-password"
            />
            <label class="text-sm">Password</label>
          </div>
          <div class="flex flex-col pb-5">
            <input
              class="border-red-500 border-2 p-2"
              value={form.password2}
              oninput={updateFormField("password2")}
              type="password"
              autocomplete="new-password"
            />
            <label class="text-sm">Repeat password</label>
          </div>
          <button
            type="submit"
            class="border-4 border-red-500 p-2.5 text-lg font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
