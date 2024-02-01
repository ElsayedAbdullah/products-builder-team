export const validation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: number;
}) => {
  const errorObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  function isValidHttpUrl(string: string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  const validImageUrl = isValidHttpUrl(product.imageURL);

  // title is between 10 and 90
  if (
    !product.title.trim() ||
    product.title.trim().length < 10 ||
    product.title.trim().length > 90
  ) {
    errorObj.title = "Product title must be between 10 and 90 characters";
  }
  if (
    !product.description.trim() ||
    product.description.trim().length < 10 ||
    product.description.trim().length > 900
  ) {
    errorObj.description =
      "Product description must be between 10 and 900 characters";
  }
  if (!product.imageURL.trim() || !validImageUrl) {
    errorObj.imageURL = "Product imageURL must be a valid url";
  }

  if (!product.price || isNaN(Number(product.price))) {
    errorObj.price = "Product price must not be empty";
  }
  return errorObj;
};
