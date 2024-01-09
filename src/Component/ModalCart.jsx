import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  Row } from 'reactstrap';
import CardProduct from './Card';

function ModalCart(props) {
  const [modal, setModal] = useState(props.openModal);
  const [count, setCount] = useState(0);
  const [state, setState] = useState(JSON.parse(localStorage.getItem("cart")) ?JSON.parse(localStorage.getItem("cart")):[])

    const refreshCart = () => {
        let data = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
        setState([])
        setTimeout(() => {
            if (data.length > 0 ) {
                setState(data)
            } else {
                toggle()
            }
            props.setRefresh(data.length)
        }, 10);

       
    }
    const toggle = () => {
        setModal(!modal)
        props.chengeFilter()
    };
    
    useEffect(() => {
        let count =0
        state.map((e) => count += e.srm )
        setCount(count)
    }, [state]);

  return (
    
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}> سبد خرید</ModalHeader>
        <ModalBody>
        <div className="container">
                    <Row className='justify-content-between'>
                        {state && state.map((item) =>
                            <CardProduct refreshCart={refreshCart} data={item} />
                        )}
                    </Row>
                </div>
        </ModalBody>
          <ModalFooter className='justify-content-between'>
          <Button color="secondary" onClick={toggle}>
            پرداخت
              </Button>
              <div>
              <span>
          مجموع قیمت:
              </span>
                  {` `}
                  <span>
                  {count}
              </span>
              </div>
          
        </ModalFooter>
      </Modal>
   
  );
}

export default ModalCart;