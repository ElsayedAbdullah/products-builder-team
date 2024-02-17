import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

interface IProps {
  removeProductHandler: () => void;
  closeDeleteModal: () => void;
  isOpenDeleteModal: boolean;
}

const DeleteProductModal = ({
  removeProductHandler,
  closeDeleteModal,
  isOpenDeleteModal,
}: IProps) => {
  return (
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
  );
};

export default DeleteProductModal;
