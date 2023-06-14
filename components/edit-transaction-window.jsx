import { Modal, useModal } from "@nextui-org/react";
import EditTransactionForm from "./edit-transaction-form";

export default function EditTransaction({ transaction }) {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <button
        className="text-indigo-600 hover:text-indigo-900 px-3"
        onClick={() => setVisible(true)}
      >
        Edit Transaction
      </button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Body>
          <EditTransactionForm
            transaction={transaction}
            closeWindow={() => setVisible(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
