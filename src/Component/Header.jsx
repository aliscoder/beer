import React, { useState } from 'react';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';
import ModalCart from './ModalCart';

const Header = (props) => {

    const [getitems, setGetitems] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [])
    const [sort, setSort] = useState(false)
    const [openModal, setopenModal] = useState(false)
    const [state, setstate] = useState([
        {id:1 , name:" پیتزا",type:"pizza"},
        {id:2 , name:" استیک",type:"Spicy"},
        {id:3 , name:"نوشابه ها",type:""},
    ]);
    return (
        <Nav
            justified
            pills
        >
            {state &&  state.map((food) =>
            <NavItem className='mx-1'>
                <NavLink
                    active
                    onClick={()=>{props.chengeFilter(food.type)}}
                >
            {food.name}
                </NavLink>
            </NavItem>
            )}
            
            <div onClick={()=>setopenModal(!openModal)} style={{width:"40px",display:'flex',gap: '4px', justifyContent: 'center', alignItems: 'center'}} >
                <i class="fa fa-cart-plus" aria-hidden="true"/>
                  <span>{props.refresh> 0 ? props.refresh : getitems.length}</span>  
                </div>
                    
            <div style={{ width: "40px", display: 'flex',  justifyContent: 'center', alignItems: 'center' }} >
                
                    <i onClick={()=>props.listFaveritt()}  class="fa fa-heart" aria-hidden="true" />
                </div>
            <div onClick={() => {
                props.listSort()
            setSort(!sort)
            }} style={{ width: "40px", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                {
                    sort ? <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
                        :
                        <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>
                }
            
            </div>
            
            {openModal && <ModalCart setRefresh={props.setRefresh} refresh={props.refresh} chengeFilter={props.chengeFilter} openModal={ openModal} />

            }
                    
                
            
        </Nav>
    );
}

export default Header;
