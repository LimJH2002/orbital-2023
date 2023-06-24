import { Modal, Button, Text } from "@nextui-org/react";

import React from "react";

const NewsModal = (props) => {
  return (
    <Modal
      scroll
      width="70%"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...props.bindings}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Modal with a lot of content
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">{props.id}</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={() => props.setVisible(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewsModal;
