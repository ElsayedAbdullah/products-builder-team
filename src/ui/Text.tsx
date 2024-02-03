import { ReactNode } from "react";
interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  as: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}
const Text = ({ className, as: Component, children }: IProps) => {
  return (
    <Component as={Component} className={className}>
      {children}
    </Component>
  );
};

export default Text;
