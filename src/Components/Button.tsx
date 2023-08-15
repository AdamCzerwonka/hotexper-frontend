import { JSX, ParentComponent } from "solid-js";

type ButtonColor = "standard" | "green" | "red" | "yellow";

type ButtonProps = {
  content: string;
  Icon?: JSX.Element;
  color?: ButtonColor;
  onClick: () => void;
};

const ColorSchemes = {
  standard: {
    background: "bg-blue-800",
    hover: "bg-blue-800",
  },
  green: {
    background: "bg-green-800",
    hover: "bg-green-900",
  },
  red: {
    background: "bg-red-800",
    hover: "bg-red-900",
  },
  yellow: {
    background: "bg-yellow-800",
    hover: "bg-yellow-900",
  },
} as const;

const Button: ParentComponent<ButtonProps> = (props) => {
  const color = ColorSchemes[props.color] || ColorSchemes["standard"];
  return (
    <button
      class={`flex flex-row justify-between items-center border border-black rounded py-2 px-5 ${color.background} hover:${color.hover}`}
      onclick={props.onClick}
    >
      <span class="mx-1">{props.Icon}</span>
      {props.content}
    </button>
  );
};

export default Button;
