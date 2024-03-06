/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  className: string;
}

const Image = ({ className, ...rest }: IProps) => {
  return <img className={`${className} rounded-md"`} {...rest} />;
};

export default memo(Image);
