import React, {useState, useContext} from 'react'
import { HeaderBottom } from './HeaderBottom';
import {Link, useHistory} from 'react-router-dom';
import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';
import { LoginContext } from '../contexts/LoginContext';
import axios from 'axios';
import backendURL from './../config';

// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import {cartAction} from "../redux/actions/cart.js";

const Cart = () => {
	// const navigate = useNavigate();
 	// const dispatch = useDispatch();

	// const [gift, setGift] = useState([]);
	const {cart, setCart} = useContext(ShoppingPageOverviewContext)
	const forceUpdate = useForceUpdate();
	const history = useHistory();
	const {user} = useContext(LoginContext)
	var calTotal = 0
	cart.forEach(cartItem => {
		calTotal = calTotal+parseInt(cartItem.quantity)*parseInt(cartItem.item.price)
	});
	console.log(cart)
	const [total, setTotal] = useState(calTotal);

	const up=(q, index) => {
		if (cart[index].item.quantity > q){
			var cartItem = cart[index]
			cartItem.quantity += 1
			setCart(cart)
			var temp = total + parseInt(cart[index].item.price)
			setTotal(temp)
			forceUpdate()
		}
	}
	
	const down= (q, index) => {
		if(q>0){
			// console.log(change)
			var cartItem = cart[index]
			cartItem.quantity -= 1
			setCart(cart)
			var temp = total - parseInt(cart[index].item.price)
			setTotal(temp)
			forceUpdate()
		}
	}
	
	const handlePurchase = () => {

		for (let index = 0; index < cart.length; index++) {
			const cartItem = cart[index]
			if (cartItem.quantity <= 0){
				cart.splice(index, 1)
			}
		}
		setCart(cart)
		axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
		axios.post(`${backendURL}/purchase`,cart).then((res) => {
			if (res.status==200){
                // console.log("Purchased Cart!");
                addPurchase({cart: cart, user: user, total: total})
			} else {
                console.log("Internal Server Error")
			}
		}).catch((err) => console.log(err));
	}
	const addGiftOption = (index) => {
		var cartItem = cart[index]
		cartItem.giftOption = !cartItem.giftOption
		setCart(cart)
		console.log(cart)
	}
	const changeGiftNote = (value, index) => {
		var cartItem = cart[index]
		console.log(cart[index])
		cartItem.giftNote = value
		setCart(cart)
		forceUpdate()
	}

	const addPurchase = (data) => {
		console.log(data)
		axios.post(`${backendURL}/addPurchase`,data).then((res) => {
			if (res.status==200){
                console.log("Purchased Cart!");
				const cartToSend = cart
				setCart([]);
                history.push({pathname: "/purchasepage", state:{total: total, cart: cartToSend}})
			} else {
                console.log("Internal Server Error")
			}
		}).catch((err) => console.log(err));
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
									<li><Link to ="/updateProfile"><i class="fa fa-user"></i> USER</Link></li>
									<li><Link to ="/"><i class="fa fa-star"></i> DASHBOARD</Link></li>
									
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		
			<HeaderBottom />
		</header>

		<section id="cart_items">
			<div class="container">
				
				<div class="table-responsive cart_info">
					<table class="table table-condensed">
						<thead>
							<tr class="cart_menu">
								<td class="shop Name">Shop Name</td>
								<td class="image">Item</td>
								<td class="description"></td>
								
								<td class="price">Price</td>
								<td class="quantity">Quantity</td>
								<td class="total">Total</td>
								<td className='gift'>Gift Option</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{cart.map((c, index)=>{
								// console.log(c)
								// console.log(index)
								return (
									<tr>
									<td class="shop_name">
										<h4>{c.item.shop}</h4>
									</td>
									<td class="cart_product">
										<a href=""><img src="images/cart/one.png" alt="" /></a>
									</td>
									
									<td class="cart_description">
										<h4><a href="">{c.item.name}</a></h4>
										<p>Web ID: {c.item.id}</p>
									</td>
									<td class="cart_price">
										<p>${c.item.price}</p>
									</td>
									<td class="cart_quantity">
										<div class="cart_quantity_button">
											<button type="button" onClick={()=>up(c.quantity, index)} class="cart_quantity_up" href=""> + </button>
											<input class="cart_quantity_input" type="text" name="quantity" value= {c.quantity} autocomplete="off" size="2" />
											<button type="button" onClick={()=>down(c.quantity, index)} class="cart_quantity_down" href=""> - </button>
										</div>
									</td>
									<td class="cart_total">
										<p class="cart_total_price">$ {c.item.price * c.quantity}</p>
									</td>
									<td class="cart_gift_options">
										<div class="form-check">
											<input class="form-check-input" onChange={()=>addGiftOption(index)} type="checkbox" value="" id="flexCheckChecked"></input>
											<label class="form-check-label" for="flexCheckChecked">
												Add As Gift Item
											</label>
										</div>
										<div>
										<input onChange={e=>changeGiftNote(e.target.value, index)} id="giftNote" type="text" placeholder="Gift Note" value={c.giftNote}/>
										</div>
									</td>
									<td class="cart_delete">
										<a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
									</td>
								</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</section> 

		<section id="do_action">
			<div class="container">
				<div class="heading">
					<h3>What would you like to do next?</h3>
					<p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
				</div>
				<div class="row">
					
					<div class="col-sm-6">
						<div class="total_area">
							<ul>
								<li>Cart Sub Total <span>${total}</span></li>
								<li>Shipping Cost <span>Free</span></li>
								<li>Total <span>${total}</span></li>
							</ul>
								<button type='button' onClick={handlePurchase} class="btn btn-default check_out" href="">Check Out</button>
						</div>
					</div>
				</div>
			</div>
		</section>
    </div>
  )
}
const useForceUpdate = () => {
	const [value, setValue] = useState(0); // integer state
	return () => setValue(value => value + 1);
}
export default Cart;