import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { HeaderBottom } from './HeaderBottom';
import etsy_logo from '../assets/etsy_logo.JPG'; // Tell webpack this JS file uses this image
// import { useEffect } from 'react/cjs/react.production.min';
import axios from 'axios';
import backendURL from '../config';
import { LoginContext } from '../contexts/LoginContext';

const MyPurchase = () => {
    const cart =[];
	const [allItems,setAllItems] = useState([])
	const {user} = useContext(LoginContext)
	const getPurchase = ()=>{
		axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
		axios.post(`${backendURL}/getPurchase`, {user: user}).then((res) => {
            if (res.status==200){
				
                const items = res.data.result
				
                let newItems = []
				let order = []
				order.push(items[0])
				for (let index = 1; index <= items.length-1; index++) {

					if (items[index-1].orderId === items[index].orderId) {
						order.push(items[index])
					} else {
						newItems.push(order)
						order = []
						order.push(items[index])
					}
					
				}
				if(order.length > 0) {
					newItems.push(order)
				}
				setAllItems(newItems);

            } else {
                console.log("items not recieved");
            }
        }).catch((err) => console.log(err));
	}

	useEffect(()=>{
		getPurchase();
	})

  return (
    

<div class="row">
    

    <div class="card mb-4 mb-xl-0">
        
    


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
                    <h3>MY PURCHASES</h3>
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

</div>



<div className='row'>
<section id="cart_items">
			<div class="container">
			{allItems.map((cartItem, index) =>{
				var t = 0
			
				return (<>
					<div class="table-responsive cart_info">
						<table class="table table-condensed">
							<thead>
								<tr class="cart_menu">
									<td class="shop Name">Shop Name</td>
									<td class="image">Item</td>
									<td class="gift">Gift</td>
									<td class="price">Price</td>
									<td class="quantity">Quantity</td>
									<td class="total">Total</td>
									<td></td>
								</tr>
							</thead>
							<tbody>
							{cartItem.map((itemin, i)=>{
								t = itemin.total
								return(
									<>
									<tr>
										<td class="shop_name">
											<h4>{itemin.shop}</h4>
										</td>
										<td class="cart_product">
										<h4><a href="">{itemin.itemName}</a></h4>
											<p>Web ID: {itemin.itemId}</p>
										</td>
										<td>
											<p>{itemin.giftOption ? itemin.giftNote : "Not A Gift"}</p>
										</td>
										<td class="cart_price">
											<p>${itemin.price}</p>
										</td>
										<td class="cart_quantity">
										<p>{itemin.quantity}</p>
										</td>
										<td class="cart_total">
											<p class="cart_total_price">${itemin.price * itemin.quantity}</p>
										</td>
									</tr>
									</>
								)
							})}
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td>Total: </td>
								<td><p class="cart_total_price">${t}</p></td>
							</tr>
								
							</tbody>
						</table>
						
					</div>
					</>
				)
			})
			}
			</div>
		</section> 


    

    </div>


    </div>
  )
}

export default MyPurchase;