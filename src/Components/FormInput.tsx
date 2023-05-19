import { Component } from "solid-js";

interface FormInputProps {
  Label: string;
  Value: string;
  updateFunc(): any;
}

const FormInput: Component<FormInputProps> = (props) => {
  return (
    <>
      <div class="flex flex-col pb-5">
        <input
          class="border-red-500 border-2 p-2 dark:bg-slate-800"
          value={props.Value}
          oninput={props.updateFunc()}
          type="text"
        />
        <label class="text-sm dark:text-slate-400">{props.Label}</label>
      </div>
    </>
  );
};

export default FormInput;
