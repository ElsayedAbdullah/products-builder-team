import { IProduct } from "../interfaces";
import ColorBall from "../ui/ColorBall";
import { txtSlicer } from "../utils/txtSlicer";
import Image from "../ui/Image";
import Button from "../ui/Button";
import Text from "../ui/Text";

interface IProps {
  product: IProduct;
}

const Card = ({ product }: IProps) => {
  const { title, description, price, imageURL, colors, category } = product;
  const renderProductColors = colors.map((color) => (
    <ColorBall key={color} color={color} />
  ));
  return (
    <div className="border border-gray-300 rounded-md flex flex-col justify-between gap-4 p-3 mx-auto w-full">
      <Image
        className={`object-cover w-full h-[11.5rem] rounded-md`}
        src={imageURL}
        alt={title}
      />
      <Text as={"h3"}>{title}</Text>
      <Text as={"p"}>{txtSlicer(description)}</Text>

      <div className="flex items-center space-x-2 flex-wrap">
        {/* color balls */}
        {colors.length ? (
          renderProductColors
        ) : (
          <Text as={"p"}>No Colors Found</Text>
        )}
      </div>
      <div className="flex items-center justify-between">
        {/* price */}
        <Text as={"span"}>{price}</Text>
        {/* image thumbnail */}
        <Image
          className="object-center  w-10 h-10 rounded-full"
          src={category.imageURL}
          alt={category.name}
        />
      </div>
      <div className="flex items-center space-x-3">
        <Button variant={"primary"} size={"small"} fullWidth>
          Edit
        </Button>
        <Button variant={"danger"} size={"small"} fullWidth>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
