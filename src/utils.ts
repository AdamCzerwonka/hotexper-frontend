import { twMerge } from "tailwind-merge";

export const classNames = (...classNames: string[]): string => {
  return twMerge(...classNames);
};
