import { useCart } from "../context/CartContext";
import { IProduct } from "../interfaces";

interface IProps {
  selectedProduct: IProduct;
  setSelectedProduct: (product: IProduct | null) => void;
}

const ProductDetailsPage = ({
  selectedProduct,
  setSelectedProduct,
}: IProps) => {
  const { increaseCartQuantity } = useCart();
  return (
    <div className=" min-h-screen">
      {/* Header */}

      <button
        className="bg-green-400 py-1.5 px-3 rounded-md"
        onClick={() => setSelectedProduct(null)}
      >
        &larr; Back
      </button>
      <div className="container mx-auto py-4 px-6">
        <h1 className="text-center font-semibold text-3xl">Product Details</h1>
      </div>

      {/* Main content */}
      <main className="container mx-auto my-8 px-6">
        <div className="flex flex-col gap-6 items-center">
          {/* Product Image */}
          <div className="lg:w-1/2 flex-shrink-0">
            <img
              src={selectedProduct.imageURL}
              alt="Product"
              className="w-full rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <h2 className="text-2xl font-semibold mb-2">
              {selectedProduct.title}
            </h2>
            <p className="text-gray-500 mb-4">{selectedProduct.description}</p>
            <p className="text-cyan-400 font-medium text-lg mb-4">
              ${selectedProduct.price}
            </p>
            <button
              onClick={() =>
                selectedProduct.id && increaseCartQuantity(selectedProduct.id)
              }
              className="bg-indigo-500 text-white px-4 py-2 rounded duration-200 hover:bg-indigo-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsPage;
