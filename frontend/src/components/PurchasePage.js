import React,{useContext} from 'react'
import { HeaderBottom } from './HeaderBottom'
import { Link } from 'react-router-dom'
import etsy_logo from '../assets/etsy_logo.JPG'; // Tell webpack this JS file uses this image
import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';

export const PurchasePage = (props) => {
	const total = props.location.state.total;
	const cart = props.location.state.cart;

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
                    <h3>PURCHASE PAGE SUMMARY</h3>
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


<div className='row'>
<section id="cart_items">
			<div class="container">
				
				<div class="table-responsive cart_info">
					<table class="table table-condensed">
						<thead>
							<tr class="cart_menu">
								<td class="shop Name">Shop Name</td>
								<td class="image">Item</td>
								<td class="description">Description</td>
								<td>Gift Option</td>
								<td class="price">Price</td>
								<td class="quantity">Quantity</td>
								<td class="total">Total</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{cart.map((cartItem, index) =>{
								return (
									<tr>
									<td class="shop_name">
										<h4>{cartItem.item.shop}</h4>
									</td>
									<td class="cart_product">
									<h4><a href="">{cartItem.item.name}</a></h4>
										<p>Web ID: {cartItem.item.id}</p>
									</td>
									
									<td class="cart_description">
										<p>{cartItem.item.description}</p>
									</td>
									<td>
										<p>{cartItem.giftOption ? cartItem.giftNote : "Not A Gift"}</p>
									</td>
									<td class="cart_price">
										<p>${cartItem.item.price}</p>
									</td>
									<td class="cart_quantity">
									<p>{cartItem.quantity}</p>
									</td>
									<td class="cart_total">
										<p class="cart_total_price">${cartItem.item.price*cartItem.quantity}</p>
									</td>
								</tr>
								)
							})
							}
							
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>Total: </td>
								<td><p class="cart_total_price">${total}</p></td>
							</tr>
							
						</tbody>
					</table>
				</div>
			</div>
		</section> 


    

    </div>
    </div>
  )
}
