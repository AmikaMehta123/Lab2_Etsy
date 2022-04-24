
import React ,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import etsy_logo from '../assets/etsy_logo.JPG'; // Tell webpack this JS file uses this image
import axios from 'axios'
import backendURL from './../config'


export const CheckName = () => {

    const [name, setname] = useState('');
    const history = useHistory()

    const checkif = () =>
    {
        if(name=="")
        {
            alert("blank field");
        }
        else
        {
            var data = {shop_name: name}
            axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
            axios.post(`${backendURL}/checkAvialability`, data).then((res) => {
                if (res.status==200){
                    alert("can create a shop");
                    history.push({
                        pathname: '/addShop',
                        state: {name: name }
                    });
                        
                } else if (res.status == 202) {
                    alert("cannot create a shop");
                }
            }).catch((err) => console.log(err));
        }
    }


  return (
    
        <>
    <header id="header">
    <div class="header-middle header-color-1">
        <div class="container header-color-1 ">
            <div class="row">
                <div class="col-sm-4">
                    <div class="logo pull-left">
                        <a href="index.html"><img src = {etsy_logo} alt="etsy_logo" /></a>
                    </div>
                </div>
                <div className='col-sm-4'>
                    <h3>CHECK SHOP NAME</h3>
                </div>
                <div class="col-sm-4">
                    <div class="shop-menu pull-right" >
                        <ul class="nav navbar-nav">
						<li><Link to="/updateProfile"><i class="fa fa-user"></i><b>USER</b></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </header>
    <br></br>
    <form>
        <div className='row'>
            <div className='col-sm-3'></div>
            <div class="md-form mb-2 col-sm-6">
                <label data-error="wrong" data-success="right" for="shopname">SHOP NAME</label>
                {/* <input onChange={(e)=>setName(e.ta)} value={loginData.name} id="loginname" type="text" placeholder="Name"/> */}
                <input onChange={(e)=> setname(e.target.value)} value ={name} type="text" id="shopname" class="form-control validate" placeholder='Check Shop Name'/>
                <br></br>
            </div>
        </div>
        <div className='row'>
            <button type="button" onClick={()=>checkif()} className='btn btn-default'>CHECK NAME</button>
        </div>
    </form>
</>


    


  )
}


