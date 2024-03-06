/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="p-2 border border-gray-300 bg-transparent focus:outline-none shadow-sm focus:ring-1 ring-indigo-500 rounded-md text-black"
      {...rest}
    />
  );
};

export default memo(Input);
