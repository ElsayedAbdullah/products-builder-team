interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  color: string;
}

const ColorBall = ({ className, color, ...rest }: IProps) => {
  return (
    <span
      className={`${className} w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default ColorBall;
