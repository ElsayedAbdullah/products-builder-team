interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return (
    <>
      {msg ? <p className="text-red-500 font-semibold text-sm">{msg}</p> : null}
    </>
  );
};

export default ErrorMsg;
