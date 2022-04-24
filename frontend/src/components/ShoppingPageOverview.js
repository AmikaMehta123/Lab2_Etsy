import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';
import { Link } from 'react-router-dom';

const ShoppingPageOverview = (props) => {

	const history = useHistory()
	const {cart, setCart, shopItem} = useContext(ShoppingPageOverviewContext)
	const [itemQuantity, setItemQuantity] = useState(1);
	const inStockQuantity = shopItem.quantity;
	
	const setQ = (e) => {
		setItemQuantity(e.target.value)
	}
	const goToCart = (q) => {
		if (inStockQuantity<q){
			alert(`Only ${inStockQuantity} in Stock.`)
		} else {
			var cartItem={
				item: shopItem,
				quantity: q,
				giftOption: false,
				giftNote: ""
			}
			setCart([...cart, cartItem])

			history.push('/cart')
		}
	}
  return (
    <div>

<header id="header">
		
		
		<div class="header-middle">
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="logo pull-left">
							<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
						</div>
						<div class="btn-group pull-right">
							
							
							
						</div>
					</div>
					<div class="col-sm-8">
						<div class="shop-menu pull-right">
							<ul class="nav navbar-nav">
								<Link to="/"><li><a href=""><i class="fa fa-user"></i>Dashboard</a></li></Link>
								<Link to="favpage"><li><a href=""><i class="fa fa-star"></i> Wishlist</a></li></Link>
								
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	
	<div>
		<div class="container">
			<div class="row">
				<div class="col-sm-3">
				
				</div>
				
				<div class="col-sm-10 padding-right">
					<div class="product-details">
						<div class="col-sm-5">
							<div class="view-product">
								<img src={shopItem.picture} alt=""  height={150} width={150}/>
							</div>
	
						</div>
						<div class="col-sm-7">
							<div class="product-information">
								<img src="images/product-details/new.jpg" class="newarrival" alt="" />
								<h2>Shop Name: {shopItem.shop}</h2>
								<p>Web ID: {shopItem.id}</p>
								<img src="images/product-details/rating.png" alt="" />
								<span>
									<h2>Item Name: {shopItem.name}</h2>
									<span>US ${shopItem.price}</span>
									<label>Quantity:</label>
									<input type="text" onChange={setQ} value={itemQuantity}  />
									<button onClick={() => goToCart(itemQuantity)} type="button" class="btn btn-default cart">
										<i class="fa fa-shopping-cart"></i>
										Add to cart
									</button>
								</span>
								<p><b>Availability:</b> In Stock</p>
								<p><b>Condition:</b> New</p>
								<p><b>Brand:</b> E-SHOPPER</p>
							</div>
						</div>
					</div>
    </div>


    </div>
    </div>
    </div>
    </header>
    </div>
  )
}

export default ShoppingPageOverview;
