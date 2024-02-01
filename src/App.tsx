import { formInputsList, productList } from "./data/index";
import Button from "./ui/Button";
import { useState } from "react";
import Modal from "./ui/Modal";
// import { IProduct } from "./interfaces/index";
import Card from "./components/Card";
import { v4 as uuid } from "uuid";
import { IProduct } from "./interfaces";
import { validation } from "./utils/validation";

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
  const [product, setProduct] = useState<IProduct>(defaultProductObject);

  const [products, setProducts] = useState<IProduct[]>(productList);
  const [error, setError] = useState(emptyErrorObject);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const renderFormInputList = formInputsList.map(
    ({ id, label, type, name }) => (
      <div className="flex flex-col my-2" key={id}>
        <label className="text-black" htmlFor={id}>
          {label}:
        </label>
        <input
          onChange={onChangeHandler}
          value={product[name]}
          name={name}
          className="p-2 border border-gray-300 rounded-md text-black"
          id={id}
          type={type}
        />
        <p className="text-red-500 font-semibold text-sm">{error[name]}</p>
      </div>
    )
  );

  const renderProductCardList = products.map((product) => (
    <Card key={product.id} product={product} />
  ));

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, price, description, imageURL } = product;
    const validationErrors = validation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg = Object.values(validationErrors).every(
      (value) => value === ""
    );
    if (!hasErrorMsg) {
      setError(validationErrors);
      return;
    }

    setProducts((prev) => [{ id: uuid(), ...product }, ...prev]);
    setProduct(defaultProductObject);
    closeModal();
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="my-4 text-center">
          <div className="my-4">
            <Button variant={"primary"} size={"small"} onClick={openModal}>
              Add Product
            </Button>
          </div>
          <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderProductCardList}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Add Product"}>
        <form onSubmit={onSubmitHandler}>
          {renderFormInputList}
          <div className="flex space-x-2 mt-4">
            <Button variant={"primary"} size={"small"} fullWidth>
              Submit
            </Button>
            <Button variant={"secondary"} size={"small"} fullWidth>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
