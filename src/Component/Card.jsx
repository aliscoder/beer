import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap'
import Modalinfo from './Modal'

export default function CardProduct(props) {
    const [openModal, setOpenModal] = useState(false)
    const [state, setState] = useState(JSON.parse(localStorage.getItem("cart")) ?JSON.parse(localStorage.getItem("cart")):[])
    const [stateFav, setStateFav] = useState(JSON.parse(localStorage.getItem("stateFav")) ?JSON.parse(localStorage.getItem("stateFav")):[])
    
    
    const add = () => {
        setState(prev=>[...prev , props.data])
        let getitems = JSON.parse(localStorage.getItem("cart")) ?JSON.parse(localStorage.getItem("cart")):[]
        getitems.push(props.data)
        localStorage.setItem("cart",JSON.stringify(getitems))
        props.refreshCart(getitems.length)
    }
    
   
    const deleted = () => {
        setState(prev => [prev.filter(item => props.data.id != item.id)])
        let getitems = JSON.parse(localStorage.getItem("cart"))
        let item = getitems.filter(e=>e.id != props.data.id )
        localStorage.setItem("cart",JSON.stringify(item))
        props.refreshCart(item.length)
    }


    const addFav = () => {
        setStateFav(prev=>[...prev , props.data])
        let getitems = JSON.parse(localStorage.getItem("stateFav")) ?JSON.parse(localStorage.getItem("stateFav")):[]
        getitems.push(props.data)
        localStorage.setItem("stateFav",JSON.stringify(getitems))
    }



    const deletedFav = () => {
        setStateFav(prev => [prev.filter(item => props.data.id != item.id)])
        let getitems = JSON.parse(localStorage.getItem("stateFav"))
        let item = getitems.filter(e=>e.id != props.data.id )
        localStorage.setItem("stateFav",JSON.stringify(item))
    }
    
    return (
        <Card
            className="my-2"
            style={{
                border: "2px solid",
                width: '18rem'
            }}
        >
            <CardHeader className=' row justify-content-between'>
                <Col>{
                    stateFav.find((e) => e.id == props.data.id) ?
                        <i onClick={deletedFav} class="fa fa-heart" aria-hidden="true"></i>
                        :

                    <i onClick={addFav} class="fa fa-heart-o" aria-hidden="true"></i>
                }
                </Col>
                <Col>  <span className='col-9'>{props.data.name}</span>    </Col>
            </CardHeader>
            <CardBody>

                <CardTitle tag="h5">
                    <CardImg
                        alt="Card image cap"
                        src={props.data.image_url}
                        style={{
                            height: 150
                        }}
                        width="100%"
                    />
                </CardTitle>
                <CardText>
                    قیمت : 
                    {props.data.srm}
                </CardText>
                
            </CardBody>
            <CardFooter>
            <Row className='justify-content-between'>
                    {state &&
                        state.find((e) => e.id == props.data.id) ?
                        <Button onClick={deleted} style={{color:"red" ,backgroundColor:"white"}} className='col-5 info'>
                         حذف
                        </Button> 
                            :
                            <Button onClick={add} className='col-5'>
                        خرید
                    </Button>
}
                    
                    <Button onClick={()=>setOpenModal(!openModal)}  className='col-5'>
                        مشاهده
                    </Button >
                </Row>
            </CardFooter>
            {openModal &&
                <Modalinfo data={props.data} openModal={openModal}/>
            }
        </Card>
    )
}
