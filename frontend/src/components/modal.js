import React, { useState } from 'react';

import { Button, Modal, Table } from 'react-bootstrap';

function Test(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props.CDI);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>CDI</th>
              <th>Poupança</th>
              <th>CDBpos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Valor:</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Conheça mais tipos de investimentos!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Test;
