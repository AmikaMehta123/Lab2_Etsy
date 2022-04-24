import React,{ useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import etsy_logo from '../assets/etsy_logo.JPG'
import PopUpForm from './PopUpForm';
import ShopRow from './ShopRow';
import { LoginContext } from '../contexts/LoginContext';
import axios from 'axios'
import backendURL from './../config'
import { EditImage } from './EditImage';

const ViewShop = () => {

    const [shops, setShops] = useState([]);
    const {user} = useContext(LoginContext)
    const [modalClosed, setModalClosed] = useState(true);
    const handleClose = () => {setModalClosed(true)}
    const handleOpen = () => {setModalClosed(false)}
    // console.log(user)
    // console.log({owner: user})
    const getShops = () => {
        var data = {owner: user}
        // console.log("pop"+data)
        axios.post(`${backendURL}/getShops`, data).then((res) => {
            if (res.status==200){
                setShops(res.data.result)
                // console.log(shops);
            } else {
                alert("No shops, Add a shop")
            }
        }).catch((err) => console.log(err));
    }

    useEffect(()=>{
        getShops();
    },[modalClosed])
  return (
    <>
    <header id="header">
        <div class="header-middle header-color-1">
            <div class="container header-color-1 ">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="logo pull-left">
                            <Link to="/"><img src = {etsy_logo} alt="etsy_logo" /></Link>
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
    <br></br><br></br>
    {shops.map((s, i) => {
        return (
            <>
            <ShopRow key={i} shop = {s} handleOpen={handleOpen}/>
            <PopUpForm key={i} shopname = {s} handleOpen={handleOpen}/>
            {/* <EditImage key={i} shopname = {s} handleOpen={handleOpen}/> */}
            </>
        )
    })}
    
    </>
  )
}

export default ViewShop;
