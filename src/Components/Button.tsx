import { JSX, ParentComponent } from "solid-js";
import { classNames } from "../utils";

const ColorSchemes = {
  standard: "bg-blue-800 hover:bg-blue-900",
  green: "bg-green-800 hover:bg-green-900",
  red: "bg-red-800 hover:bg-red-900",
  yellow: "bg-yellow-800 hover:bg-yellow-900",
} as const;

type ButtonColor = keyof typeof ColorSchemes;

type ButtonProps = {
  content: string;
  Icon?: JSX.Element;
  color?: ButtonColor;
  onClick: () => void;
};

const Button: ParentComponent<ButtonProps> = (props) => {
  const color = ColorSchemes[props.color] || ColorSchemes["standard"];
  return (
    <button
      class={classNames(
        "flex flex-row justify-between items-center border border-black rounded py-2 px-5",
        color
      )}
      onclick={props.onClick}
    >
      <span class="mx-1">{props.Icon}</span>
      {props.content}
    </button>
  );
};

export default Button;
