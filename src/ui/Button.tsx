/* eslint-disable react-refresh/only-export-components */
import { memo, ReactNode } from "react";
import { cn } from "../utils/Clsx";
import { cva, type VariantProps } from "class-variance-authority";

interface IProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}
const buttonVariants = cva("rounded-md cursor-pointer duration-200", {
  variants: {
    variant: {
      primary: "bg-indigo-500 hover:bg-indigo-600",
      secondary: "bg-gray-500 hover:bg-gray-600",
      success: "bg-green-500 hover:bg-green-600",
      danger: "bg-red-500 hover:bg-red-600",
    },
    size: { small: "p-2", medium: "p-4", large: "p-6" },
    fullWidth: {
      true: "w-full",
      false: "w-fit",
    },
  },
  compoundVariants: [
    // Applied via:
    //   `button({ intent: "primary", size: "medium" })`
    {
      variant: "primary",
      size: "medium",
    },
  ],
});

const Button = ({ children, variant, size, fullWidth, ...rest }: IProps) => {
  //   clsx twMerge
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }))}
      {...rest}
    >
      {children}
    </button>
  );
};

export default memo(Button);
