import { Modal, Button, Text } from "@nextui-org/react";
import React, { Fragment, useState, useEffect } from "react";
import Loading from "@/pages/loading";

const NewsModal = (props) => {

  return (
    <Fragment>
      <Modal
        scroll
        width="70%"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...props.bindings}
      >
        <Modal.Header className="bg-slate-100">
          <Text id="modal-title" size={18}>
            {props.post.title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            <div dangerouslySetInnerHTML={{ __html: data.markup }} />
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="error"
            onPress={() => props.setVisible(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default NewsModal;
