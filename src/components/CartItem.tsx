import { useCart } from "../context/CartContext";
import { productList } from "../data";

interface IProps {
  id: number;
  quantity: number;
}
const CartItem = ({ id, quantity }: IProps) => {
  const { removeCartItem } = useCart();
  console.log(id);

  const item = productList.find((p) => p.id === id);
  console.log(item);

  if (!item) return;
  return (
    <li key={item.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.imageURL}
          alt={item.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.title}</h3>
            <p className="ml-4">${item.price * quantity}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div>
            <p className="text-gray-900 font-medium">Price: ${item.price}</p>
            <p className="text-gray-500">Qty {quantity}</p>
          </div>

          <div className="flex">
            <button
              onClick={() => {
                item.id && removeCartItem(item.id);
              }}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
