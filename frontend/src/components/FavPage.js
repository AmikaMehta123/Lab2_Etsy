import React, {useContext, useState, useEffect} from 'react'
import etsy_logo from '../assets/etsy_logo.JPG'; 
import { Link,useHistory } from 'react-router-dom';
import { HeaderBottom } from './HeaderBottom';
import { LoginContext } from '../contexts/LoginContext';
import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';
import axios from 'axios';
import backendURL from './../config'
import rings from '../assets/rings.JPG'

export const FavPage = () => {

    const {user} =useContext(LoginContext);
    const {setShopItem} = useContext(ShoppingPageOverviewContext)
    const [items, setItems] = useState([]);
    const history = useHistory();
    // const allItems = []
    const getItems = () => {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${backendURL}/getFavourites`, {user: user}).then((res) => {
            if (res.status==200){
                const allItems = res.data.result
                setItems(allItems)
                // console.log(allItems)
            } else {
                console.log("items not recieved");
            }
        }).catch((err) => console.log(err));
    } 

    const shop=(item)=>
    {
        setShopItem(item)
        history.push('/shoppingPageOverview')
    }

    useEffect(()=>{
        getItems()
    },[])

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
                <div className='col-sm-4'>
                    <h3>FAV PAGE</h3>
                </div>
                <div class="col-sm-4">
                    <div class="shop-menu pull-right" >
                        <ul class="nav navbar-nav">
						<li><Link to="/"><i class="fa fa-user"></i><b>HOME</b></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </header>
    <br></br>
    <br></br>

    <div class="header-bottom">
        <div class="container">
            <div class="row">
                <div class="col-sm-9">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="mainmenu pull-left">
                        <ul class="nav navbar-nav collapse navbar-collapse">
						<li><Link to="/">HOME</Link></li>
						<li><Link to="/contact">CONTACT</Link></li>
                        
                        
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="search_box pull-right">
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className='row'>
        <div className='col-sm-4'>
            <div className='row'>
                <div className='col-sm-4'>
                    <img src="https://etsy-images.s3.amazonaws.com/bob.png" />
                </div>
                <div className='col-sm-8'>
                    <div className='row pull-left'>
                        <div className='col-sm-6'>
                            <p>Welcome {user}</p>
                        </div>
                        <div className='col-sm-6'>
                        <button type="button"><Link to="/updateProfile">UPDATE INFO</Link></button></div>
                    </div><br></br><br></br>
                    <div className='row'>
                    <div className='col-sm-6'> 
                    <br></br>
                    <label>0 Followers</label>
                    <br></br>
                    <label>0 Following</label>
                     </div>   
                    </div>
                </div>
            </div>
        </div>
    </div>

    <h1>FAVOURITES</h1>
    {items.map((item, index) => {

        var tag = <p>Out of Stock</p>
        if (item.quantity>0) {
            tag = <button onClick={() => shop(item)} class="btn btn-default add-to-cart" ><i class="fa fa-shopping-cart"></i>Add to cart</button>
        }
        return(
            <div class="col-sm-4" key={item.id}>
                <div class="product-image-wrapper">
                    <div class="single-products">
                            <div class="productinfo text-center">
                            <img src = {item.picture} alt="shirt_logo" />
                                <h2>{item.price}</h2>
                                <p>{item.name}</p>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>{item.price}</h2>
                                    <p>{item.shop}</p>
                                    {/* <button onClick={() => shop(item)} class="btn btn-default add-to-cart" ><i class="fa fa-shopping-cart"></i>Add to cart</button> */}
                                    {tag}
                                </div>
                            </div>
                    </div>
                    {/* <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            <li id='wishlist' onClick={()=>addAsFav(item)} value={favbool}><i class="fa fa-plus-square"></i>Add to wishlist</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        )
        })}
    

    </div>
  )
}
