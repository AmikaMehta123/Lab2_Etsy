import React, {useContext, useState, useEffect} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { HeaderBottom } from './HeaderBottom';
import etsy_logo from '../assets/etsy_logo.JPG'; // Tell webpack this JS file uses this image
import jewellery_image from '../assets/jewellery_image.JPG'
import toys from '../assets/toys.JPG'
import clothes from '../assets/clothes.JPG'
import shirt from '../assets/shirt.JPG'
import rings from '../assets/rings.JPG'
import jackets from '../assets/jackets.JPG'

import girl_image from '../assets/girl_image.JPG'

import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';
import { LoginContext } from '../contexts/LoginContext';
import CardGrid from './CardGrid';


export const LandingPage = (props) => {
	const reload = useForceUpdate();
    const {setShopItem} = useContext(ShoppingPageOverviewContext)
	const {user, setUser} = useContext(LoginContext)
	
	const [inputText, setInputText] = useState("");
	let inputHandler = (e) => {
		//convert input text to lower case
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

    const history = useHistory()
    const shop=(item)=>
    {
        setShopItem(item)
        history.push('/shoppingPageOverview')
    }
    const {items} = props 

  return (
    <div>


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
						<li><Link to="/favpage"><i class="fa fa-star"></i><b>FAVOURITE PAGE</b></Link></li>
                        <li><Link to="/cart"><i class="fa fa-crosshairs"></i><b>CART</b></Link></li>
						<li><Link to="/mypurchase"><i class="fa fa-star"></i><b>MY PURCHASE</b></Link></li>
						<li onClick={() => setUser('')}><Link><i class="fa fa-crosshairs"></i><b>LOG OUT</b></Link></li>
						
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                        <li><Link to="/checkname">ADD SHOP</Link></li>
                        <li><Link to="/viewshop">VIEW SHOP</Link></li>
						
                        
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="search_box pull-right">
                        <input type="text" onChange={inputHandler} placeholder="Search"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

	<h2 class="title text-center">WELCOME {user} !</h2>

	<section id="slider">
			<div class="container">
				<div class="row" align="center">
					<div class="col-sm-12">
						<div id="slider-carousel" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
								<li data-target="#slider-carousel" data-slide-to="0" class="active" height="500" width="500"></li>
								<li data-target="#slider-carousel" data-slide-to="1"></li>
								<li data-target="#slider-carousel" data-slide-to="2"></li>
								<li data-target="#slider-carousel" data-slide-to="3"></li>
								<li data-target="#slider-carousel" data-slide-to="4"></li>
							</ol>
							
							<div class="carousel-inner">
								<div class="item active" width="500">
									<img src= {jewellery_image}  alt="" />
								</div>
								<div class="item">
									<img src={toys} alt="" />
								</div>
								
								<div class="item" width="500" height="500">	
									<img src={clothes} alt="" />
								</div>
								<div class="item" width="500" height="500">
									
								<img src={girl_image} alt="" />
								</div>
								<div class="item" width="500" height="500">
									
								<img src={rings} alt="" />
								</div>

								<div class="item" width="500" height="500">
									
								<img src={jackets} alt="" />
								</div>
								
							</div>
							
							<a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
								<i class="fa fa-angle-left"></i>
							</a>
							<a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
								<i class="fa fa-angle-right"></i>
							</a>
						</div>
						
					</div>
				</div>
			</div>
	</section>


	<div class="col-sm-12 padding-right">
		<div class="features_items">
			<CardGrid data={items} input={inputText} shop={shop}/>
		</div>
	</div>


	<div class="container">
			<div class="row">
				<p class="pull-left">Copyright © 2022 Etsy Inc. All rights reserved.</p>
				
				<div class="col-md-3">
					<div class="btn-group my-currency">
						<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
							DOLLAR
							<span class="caret"></span>
						</button>
							<ul class="dropdown-menu">
							<li><a href="#">Canadian Dollar</a></li>
							<li><a href="#">Pound</a></li>
							</ul>
					</div>
				</div>

				<div class="col-md-3">
					<div class="btn-group my-currency">
						<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
							USA
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li><a href="#">Canada</a></li>
							<li><a href="#">UK</a></li>
						</ul>						
					</div>
				</div>
				


				<div class="btn-group pull-right">
				<p class="pull-right">Designed by <span>Amika Mehta</span></p>
			</div>
		</div>
	</div>
	</header>




    </div>
  )
}
const useForceUpdate = () => {
	const [value, setValue] = useState(0); // integer state
	return () => setValue(value => value + 1);
}
export default LandingPage;
