interface IProps {
    className?: string;
    color: string;
}


const ColorBall = ({ className, color, ...rest }: IProps) => {
    return (
        <span className={`${className} w-5 h-5 rounded-full`} style={{ backgroundColor: color }} {...rest}></span>
    )
}

export default ColorBall;