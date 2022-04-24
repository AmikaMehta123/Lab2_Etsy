import React,{ useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import etsy_logo from '../assets/etsy_logo.JPG'
import axios from 'axios'
import backendURL from './../config'
import ItemRow from './ItemRow'
import EditPopUpForm from './EditPopUpForm'


export const ViewItem = (props) => {

    const shop = props.location.state.shop

    const [items, setItems] = useState([]);

    const [modalClosed, setModalClosed] = useState(true);
    const handleClose = () => {setModalClosed(true)}
    const handleOpen = () => {setModalClosed(false)}
    const getItems = () => {
        var data = {shop: shop};
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${backendURL}/viewitem`, data).then((res) => {
            if (res.status==200){
                setItems(res.data.result)
                console.log(res.data.result);
            } else {
                alert("No items, Add a item")
            }
        }).catch((err) => console.log(err));
    }

    useEffect(()=>{
        getItems();
    },[modalClosed])
  return (

    <div>
        <header id="header">
    <div class="header-middle header-color-1">
        <div class="container header-color-1 ">
            <div class="row">
                <div class="col-sm-4">
                    <div class="logo pull-left">
                        <Link to ="/"><img src = {etsy_logo} alt="etsy_logo" /></Link>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="shop-menu pull-right" >
                        <ul class="nav navbar-nav">
						<li><Link to="/updateProfile"><i class="fa fa-user"></i><b>USER</b></Link></li>
						<li><Link to="/faviouritePage"><i class="fa fa-star"></i><b>FAVOURITE PAGE</b></Link></li>
                        <li><Link to="/cart"><i class="fa fa-crosshairs"></i><b>CART</b></Link></li>
						
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </header>
    <br></br>
    {items.map((item, index) => {
        return (
            <>
            <ItemRow key={index} item = {item} handleOpen={handleOpen}/>
            <EditPopUpForm key={index} item={item} handleClose={handleClose}/>
            </>
        )
    })}
    <br></br>

    </div>
  )
}
