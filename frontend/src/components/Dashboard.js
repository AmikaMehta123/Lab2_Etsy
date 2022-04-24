import React, {useState, useEffect, useContext} from 'react';

import axios from 'axios';
import backendURL from './../config';
import { LoginContext } from '../contexts/LoginContext';
import LandingPage from './LandingPage';
import Login from './Login/Login';
import ShoppingPageOverview from './ShoppingPageOverview';
import { ShoppingPageOverviewContext } from '../contexts/ShoppingPageOverviewContext';



import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {getproducts} from "../redux/actions/product.js";
import {putCartAction} from "../redux/actions/cart.js";




const Dashboard = () => {

	//const {user} = useSelector((state)=>state.user);
	const {products} = useSelector((state)=>state.products);


	//const navigate = useNavigate();
	const dispatch = useDispatch();


  const [items, setItems] = useState([])
  const {user} = useContext(LoginContext)


	
  useEffect(() => {
	//dispatch(getproducts("6258e99133f26c67082b2058"));
	dispatch(getproducts(user._id));
	console.log("User id is" + user._id);
  }, []);


  const getAllItems = () => {
	axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
	axios.get(`${backendURL}/getitems`).then((res) => {
		if (res.status==200){
			const allItems = res.data.result
			setItems(allItems)
		} else {
			console.log("items not recieved");
		}
	}).catch((err) => console.log(err));
  }
  useEffect(()=>{
	getAllItems()
  },[])


  return (
	<>
		{user.length!=0 ? <LandingPage items={items}/> : <Login/>}
	</>
  );
}

export default Dashboard;