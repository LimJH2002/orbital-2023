import { Modal, useModal } from "@nextui-org/react";
import NewTransactionForm from "./new-transaction-form";

export default function NewTransaction() {
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        onClick={() => setVisible(true)}
      >
        Add Transaction
      </button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Body>
          <NewTransactionForm func={() => setVisible(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
