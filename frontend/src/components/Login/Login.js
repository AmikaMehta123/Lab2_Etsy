import React, {useState, useContext} from 'react'
import logo from './../../assets/etsy_logo.JPG';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import backendURL from '../../config';
import { LoginContext } from '../../contexts/LoginContext';
import front_page from '../../assets/front_page.JPG'
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import {useSelector, useDispatch} from "react-redux";
//import {registerAction} from
//import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from "../context/actions/actionTypes";

const Login= () => {

	const {setUser} = useContext(LoginContext);
	const dispatch = useDispatch();
	const  {error} = useSelector((state) => state.user); 
// use dispatch to call an action
//use useSelector to use the state


	//SignUp
	let initialSignUpState = {
		name: '',
		email: '',
		password: ''
	}
	const [formData, setFormData] = useState(initialSignUpState);
	
	const [loggedIn, setLoggedIn] = useState(false);

	//Login
	const [loginData, setloginData] = useState({
			name: '',
			password: '',
	})

	const [token, setToken] = useState('');



	const handleSignup = (e) => {
		e.preventDefault();
		console.log(formData);


		axios.post(`${backendURL}/signUp`,formData)
			.then((res) => {
					if (res.status == 200) {
						setFormData(initialSignUpState)
						
					}
					
				})
			.catch((err) => {
				
				  console.log(err);	
			} );
	}

	let redirectVar = false
	const handleLogin = (e) => {
		e.preventDefault();
		console.log(loginData);

		
		dispatch({
			type:"LoginRequest"
		  })


		axios.post(`${backendURL}/login`,loginData).then((res) => {
			
			if (res.status==200){
				
				dispatch({
					type:"LoginSuccess",
					payload: res.data
				  })
				console.log("Heyyyyyyyyyyyyyyy");
				console.log(res.data)
					localStorage.setItem("token", res.data);
		
					var decoded = jwt_decode(res.data.split(' ')[1]);
					localStorage.setItem("user_id", decoded._id);
					localStorage.setItem("username", decoded.name);
					setUser(decoded.name)
									
				//  this.setState({
                //     authFlag: true
                // });
				// console.log(res.data)
				redirectVar = true

			} else {
				alert(res.data)
				redirectVar = false
			}
		}).catch((err) => {
			dispatch({
				type:"LoginFailure",
				payload: err
			  })
			  console.log(err);
		});
	}
	
	// useEffect(() => {
	// 	console.log("Hello hii");
	// 	console.log(token);
	// 	if (token.length > 0) {
    //         localStorage.setItem("token", token);

    //         var decoded = jwt_decode(token.split(' ')[1]);
    //         localStorage.setItem("user_id", decoded._id);
    //         localStorage.setItem("username", decoded.name);
            
    //     }
	// }, []);

  return (
    <div>
		
		<body background= {front_page}>  

		
		 if (redirectVar ) { <Redirect to= "/"/> } 
		
		<div class="header-middle">
			
						<div class="col-sm-12">
							<div class="logo pull-left">
							<a href="index.html"><img src={logo} alt="" /></a>
						</div>
						
				
			</div>
		</div>
	
		<section id="form">
			<div class="container">
				<div class="row">
					<div class="col-sm-4 col-sm-offset-1">
						<div class="login-form">
							<h2>LOGIN TO YOUR ACCOUNT</h2>
							<form onSubmit={handleLogin}>
								<input onChange={(e)=>setloginData({...loginData, name: e.target.value})} value={loginData.name} id="loginname" type="text" placeholder="Name"/>
								<input onChange={(e)=>setloginData({...loginData, password: e.target.value})} value={loginData.password} id="loginpassword" type="password" placeholder="Password"/>
								<button type="submit" class="btn btn-default">LOGIN</button>
							</form>
						
							
							
						</div>
					</div>
					<div class="col-sm-1">
						<h2 class="or">OR</h2>
					</div>
					<div class="col-sm-4">
						<div class="signup-form">
							<h2>NEW USER SIGNUP !</h2>
							<form onSubmit={handleSignup}>
								<input onChange={(e)=>setFormData({...formData, name: e.target.value})} value={formData.name} id="signUpname" type="text" placeholder="Name"/>
								<input onChange={(e)=>setFormData({...formData, email: e.target.value})} value={formData.email} id="signUpemail" type="email" placeholder="Email Address"/>
								<input onChange={(e)=>setFormData({...formData, password: e.target.value})} value={formData.password} id="signUppassword" type="password" placeholder="Password"/>
								<button type="submit" class="btn btn-default">SIGN UP</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
		<footer id="footer">
			
			<div class="footer-bottom">
				<div class="container">
					<div class="row">
						<p class="pull-left">Copyright © 2022 ETSY Inc. All rights reserved.</p>
						<p class="pull-right">Designed by <span>Amika Mehta</span></p>
					</div>
				</div>
			</div>
			
		</footer>
		</body>
    </div>
  )
}

export default Login;
