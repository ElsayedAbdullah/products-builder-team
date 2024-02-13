import { categories, colors, formInputsList, productList } from "./data/index";
import Button from "./ui/Button";
import { useState } from "react";
import Modal from "./ui/Modal";
// import { IProduct } from "./interfaces/index";
import Card from "./components/Card";
import { v4 as uuid } from "uuid";
import { IProduct } from "./interfaces";
import { validation } from "./validation/validation";
import Input from "./ui/Input";
import ErrorMsg from "./components/ErrorMsg";
import Select from "./ui/Select";
import ColorBall from "./ui/ColorBall";
import { ProductName } from "./utils/types";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CartProvider from "./context/CartContext";

const defaultProductObject = {
  id: "",
  title: "",
  description: "",
  imageURL: "",
  price: 0,
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
};

const emptyErrorObject = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [error, setError] = useState(emptyErrorObject);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [tempColors, setTempColors] = useState<string[]>([]);

  // Handlers
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setError(emptyErrorObject);
    setTempColors([]);
  }
  function closeEditModal() {
    setIsEditOpenModal(false);
  }

  function openEditModal() {
    setIsEditOpenModal(true);
    setError(emptyErrorObject);
  }

  function closeDeleteModal() {
    setIsOpenDeleteModal(false);
  }

  function openDeleteModal() {
    setIsOpenDeleteModal(true);
    setError(emptyErrorObject);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    setError({ ...error, [name]: "" });
  };
  const onChangeEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const renderFormInputList = formInputsList.map(
    ({ id, label, type, name }) => (
      <div className="flex flex-col gap-1 my-2" key={id}>
        <label className="text-black" htmlFor={id}>
          {label}:
        </label>
        <Input
          onChange={onChangeHandler}
          value={product[name]}
          name={name}
          id={id}
          type={type}
        />
        <ErrorMsg msg={error[name]} />
      </div>
    )
  );

  // renderFormEditInput
  const renderFormEditInput = (
    id: string,
    label: string,
    name: ProductName,
    type: string
  ) => {
    return (
      <div className="flex flex-col gap-1 my-2">
        <label className="text-black" htmlFor={id}>
          {label}:
        </label>
        <Input
          onChange={onChangeEditHandler}
          value={productToEdit[name]}
          name={name}
          id={id}
          type={type}
        />
        <ErrorMsg msg={error[name]} />
      </div>
    );
  };

  const renderProductCardList = products.map((product) => (
    <Card
      setTempColors={setTempColors}
      key={product.id}
      product={product}
      openEditModal={openEditModal}
      openDeleteModal={openDeleteModal}
      setProductToEdit={setProductToEdit}
    />
  ));

  const renderProductColors = colors.map((color) => (
    <ColorBall
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, description, imageURL } = product;
    // form validation
    const validationErrors = validation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg = Object.values(validationErrors).some(
      (value) => value !== ""
    );

    if (hasErrorMsg) {
      setError(validationErrors);
      return;
    }

    setProducts((prev) => [
      {
        id: uuid(),
        ...product,
        category: selectedCategory,
        colors: tempColors,
      },
      ...prev,
    ]);
    setProduct(defaultProductObject);
    closeModal();
    toast("Product added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  const onSubmitEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, description, imageURL } = productToEdit;
    // form validation
    const validationErrors = validation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg = Object.values(validationErrors).some(
      (value) => value !== ""
    );

    if (hasErrorMsg) {
      setError(validationErrors);
      return;
    }
    const updatedproductList = products.map((item) => {
      if (item.id === productToEdit.id) {
        return {
          ...productToEdit,
          colors: tempColors,
        };
      }
      return item;
    });
    setProducts(updatedproductList);
    setProductToEdit(defaultProductObject);
    closeEditModal();
    setTempColors([]);
    toast("Product updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  const removeProductHandler = () => {
    const copyProducts = [...products];
    const filtered = copyProducts.filter(
      (item) => item.id !== productToEdit.id
    );
    setProducts(filtered);
    closeDeleteModal();
    toast("Product deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#222",
        color: "white",
      },
    });
  };

  return (
    <CartProvider>
      <Navbar />

      <div className="container mx-auto">
        <div className="my-4">
          <div className="my-4 text-center">
            <Button variant={"primary"} size={"small"} onClick={openModal}>
              Add Product
            </Button>
          </div>
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderProductCardList}
          </div>
        </div>
      </div>
      {/* Add product modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add Product"}>
        <form onSubmit={onSubmitHandler}>
          {renderFormInputList}

          <Select
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* colors */}
          <div className="flex items-center gap-2 flex-wrap my-5">
            {renderProductColors}
          </div>

          {tempColors.length ? (
            <div className="flex flex-wrap gap-1">
              {tempColors.map((color) => (
                <div
                  key={color}
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </div>
              ))}
            </div>
          ) : null}

          {/* buttons */}
          <div className="flex space-x-2 mt-4">
            <Button variant={"primary"} size={"small"} fullWidth>
              Submit
            </Button>
            <Button
              onClick={closeModal}
              type="button"
              variant={"secondary"}
              size={"small"}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Edit product modal */}
      <Modal
        isOpen={isEditOpenModal}
        closeModal={closeEditModal}
        title={"Edit Product"}
      >
        <form onSubmit={onSubmitEditHandler}>
          {renderFormEditInput("title", "Product Title", "title", "text")}
          {renderFormEditInput(
            "description",
            "Product Description",
            "description",
            "text"
          )}
          {renderFormEditInput("price", "Product Price", "price", "number")}
          {renderFormEditInput(
            "imageURL",
            "Product imageURL",
            "imageURL",
            "text"
          )}

          <Select
            selectedCategory={productToEdit.category}
            setSelectedCategory={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />

          {/* colors */}
          <div className="flex items-center gap-2 flex-wrap my-5">
            {renderProductColors}
          </div>

          <div className="flex flex-wrap gap-1">
            {tempColors.map((color) => (
              <div
                key={color}
                className="p-1.5 rounded-md"
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="flex space-x-2 mt-4">
            <Button variant={"primary"} size={"small"} fullWidth>
              Submit
            </Button>
            <Button
              onClick={closeEditModal}
              type="button"
              variant={"secondary"}
              size={"small"}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* delete product modal */}
      <Modal
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        title={"Delete Product"}
        description="Are you sure to delete this product"
      >
        {/* buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            variant={"danger"}
            size={"small"}
            fullWidth
            onClick={removeProductHandler}
          >
            Submit
          </Button>
          <Button
            onClick={closeDeleteModal}
            type="button"
            variant={"secondary"}
            size={"small"}
            fullWidth
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </CartProvider>
  );
}

export default App;
