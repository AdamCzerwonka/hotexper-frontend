import { JSX, ParentComponent } from "solid-js";

type ButtonProps = {
  content: JSX.Element;
  Icon?: JSX.Element;
  onClick: () => void;
};

const Button: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class="flex flex-row justify-between items-center border border-black py-2 px-5"
      onclick={props.onClick}
    >
      <span class="mx-1">{props.Icon}</span>
      {props.content}
    </button>
  );
};

export default Button;
