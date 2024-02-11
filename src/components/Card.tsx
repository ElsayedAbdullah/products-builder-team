import { IProduct } from "../interfaces";
import ColorBall from "../ui/ColorBall";
import { txtSlicer } from "../utils/txtSlicer";
import Image from "../ui/Image";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { formatCurrency } from "../utils/formatCurrency";

interface IProps {
  product: IProduct;
  openEditModal: () => void;
  setProductToEdit: (product: IProduct) => void;
  setTempColors: (value: string[]) => void;
}

const Card = ({
  product,
  openEditModal,
  setProductToEdit,
  setTempColors,
}: IProps) => {
  const { title, description, price, imageURL, colors, category } = product;
  const renderProductColors = colors.map((color) => (
    <ColorBall key={color} color={color} />
  ));
  const openEditHandler = () => {
    openEditModal();
    setProductToEdit(product);
    setTempColors(colors);
  };
  return (
    <div className="border border-gray-300 rounded-md flex flex-col gap-4 p-3 mx-auto w-full">
      <Image
        className={`object-cover w-full h-[11.5rem] rounded-md`}
        src={imageURL}
        alt={title}
      />
      <Text className="font-bold text-lg" as={"h3"}>
        {txtSlicer(title, 20)}
      </Text>
      <Text as={"p"}>{txtSlicer(description)}</Text>

      <div className="flex items-center gap-2 flex-wrap">
        {/* color balls */}
        {colors.length ? (
          renderProductColors
        ) : (
          <Text as={"p"}>No Colors Found</Text>
        )}
      </div>
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between">
          {/* price */}
          <Text as={"span"}>{formatCurrency(price)}</Text>
          {/* image thumbnail */}
          <div className="flex items-center gap-3">
            <Image
              className="object-center  w-10 h-10 rounded-full"
              src={category.imageURL}
              alt={category.name}
            />
            <p>{category.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={"primary"}
            size={"small"}
            fullWidth
            onClick={openEditHandler}
          >
            Edit
          </Button>
          <Button variant={"danger"} size={"small"} fullWidth>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
