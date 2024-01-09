import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Modalinfo(props) {
  const [modal, setModal] = useState(props.openModal);

  const toggle = () => setModal(!modal);

  return (
    
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{props.data.name}</ModalHeader>
        <ModalBody>
        {props.data.description}

        </ModalBody>
          <ModalFooter className='justify-content-between'>
          <Button color="secondary" onClick={toggle}>
            Cancel
              </Button>
              <div>
              <span>
          قیمت:
              </span>
                  {` `}
              <span>
              {props.data.srm}
              </span>
              </div>
          
        </ModalFooter>
      </Modal>
   
  );
}

export default Modalinfo;