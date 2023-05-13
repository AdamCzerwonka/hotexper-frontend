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
      
      navigate("success", { replace: false });
    });
  };

  return (
    <>
      <form onsubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            value={form.firstName}
            oninput={updateFormField("firstName")}
            type="text"
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            value={form.lastName}
            oninput={updateFormField("lastName")}
            type="text"
          />
        </div>
        <div>
          <label>Telephone number</label>
          <input
            value={form.phoneNumber}
            oninput={updateFormField("phoneNumber")}
            type="text"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            value={form.email}
            oninput={updateFormField("email")}
            type="email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={form.password}
            oninput={updateFormField("password")}
            type="password"
            autocomplete="new-password"
          />
        </div>
        <div>
          <label>Repeat password</label>
          <input
            value={form.password2}
            oninput={updateFormField("password2")}
            type="password"
            autocomplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
