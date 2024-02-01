import { ReactNode } from "react";
interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    as: keyof JSX.IntrinsicElements;
    children: ReactNode
}
const Text = ({ as: Component, children }: IProps) => {
    return (
        <Component as={Component}>{children}</Component>
    )
}

export default Text