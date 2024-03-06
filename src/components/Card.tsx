/* eslint-disable react-refresh/only-export-components */
import { IProduct } from "../interfaces";
import ColorBall from "../ui/ColorBall";
import { txtSlicer } from "../utils/txtSlicer";
import Image from "../ui/Image";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { formatCurrency } from "../utils/formatCurrency";
import { useCart } from "../context/CartContext";
import { memo } from "react";

interface IProps {
  product: IProduct;
  openEditModal: () => void;
  openDeleteModal: () => void;
  setSelectedProduct: (product: IProduct) => void;
  setProductToEdit: (product: IProduct) => void;
  setTempColors: (value: string[]) => void;
}

const Card = ({
  product,
  openEditModal,
  setProductToEdit,
  setTempColors,
  openDeleteModal,
  setSelectedProduct,
}: IProps) => {
  const { id, title, description, price, imageURL, colors, category } = product;
  const { increaseCartQuantity, getItemQuantity, decreaseCartQuantity } =
    useCart();
  const renderProductColors = colors.map((color) => (
    <ColorBall key={color} color={color} />
  ));

  const quantity = getItemQuantity(id!);

  const openEditHandler = () => {
    openEditModal();
    setProductToEdit(product);
    setTempColors(colors);
  };

  const onDeleteHandler = () => {
    // removeProductHandler(id);
    setProductToEdit(product);
    openDeleteModal();
  };
  return (
    <div className="border border-gray-300 rounded-md flex flex-col gap-4 p-3 mx-auto w-full">
      <Image
        className={`object-cover w-full h-[11.5rem] rounded-md`}
        src={imageURL}
        alt={title}
      />
      <h3
        className="font-bold text-lg"
        style={{ cursor: "pointer" }}
        onClick={() => setSelectedProduct(product)}
      >
        {txtSlicer(title, 20)}
      </h3>
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
          <Button
            variant={"danger"}
            size={"small"}
            fullWidth
            onClick={onDeleteHandler}
          >
            Delete
          </Button>
        </div>
        {quantity === 0 ? (
          <div>
            <Button
              variant={"success"}
              size={"small"}
              fullWidth
              onClick={() => increaseCartQuantity(product.id!)}
            >
              Add to Cart
            </Button>
          </div>
        ) : (
          <div className="relative flex items-center">
            <button
              onClick={() => decreaseCartQuantity(id!)}
              type="button"
              id="decrement-button"
              data-input-counter-decrement="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <span
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {quantity}
            </span>
            <button
              onClick={() => increaseCartQuantity(id!)}
              type="button"
              id="increment-button"
              data-input-counter-increment="quantity-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Card);
