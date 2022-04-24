import React, {useState} from 'react';
import 'reactjs-popup/dist/index.css';
import {Link} from 'react-router-dom';
import axios from 'axios'
import backendURL from './../config'
import S3FileUpload from 'react-s3';
import config from './awsConfig';


const PopUpForm = (props) =>{
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const shop = props.shopname
  const shopModalID = `shopmodal${shop.id}`
  
  let initialState = {
		shop: shop.shop,
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
	}

  const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile1 = (file) => {
       S3FileUpload.uploadFile(file, config)
       .then((data)=> {
        setSelectedFile(data.location)
        alert("Image Uploaded")
       }).catch( (err)=>{
           alert(err)
       })
    }
    //use state 
	const [formData, setFormData] = useState(initialState);

  const handleAddItem = (e) => {
		e.preventDefault();
    // setFormData({...formData, name: user});
		console.log(formData);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
		axios.post(`${backendURL}/additems`,{...formData, img:selectedFile}).then((res) => {
			if (res.status==200){
        alert("item added")
        setFormData(initialState)
        
			} else {
        console.log("Internal Server Error")
			}
		}).catch((err) => console.log(err));
	}
  return (
    <div>

<div class="modal fade" id={shopModalID} tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header text-center">
        <h4 class="modal-title w-100 font-weight-bold">FILL IN ITEM DETAILS</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <br></br>
      <div class="modal-body mx-3">
        <div class="md-form mb-5">


          <label data-error="wrong" data-success="right">ITEM NAME</label>
          <input onChange={(e)=>setFormData({...formData, name: e.target.value})} value={formData.name} type="text" id="name" class="form-control validate" />
          <br></br>
          
        </div>

        <div class="md-form mb-4">
        

        <label data-error="wrong" data-success="right" for="form2">CATEGORY</label>
        <input onChange={(e)=>setFormData({...formData, category: e.target.value})} value={formData.category} type="text" id="category" class="form-control validate" />
        <br></br>

        <label data-error="wrong" data-success="right" for="form2">DESCRIPTION</label>
        <input onChange={(e)=>setFormData({...formData, description: e.target.value})} value={formData.description} type="text" id="form2" class="form-control validate" />

        <label data-error="wrong" data-success="right" for="form2">PRICE</label>
        <input onChange={(e)=>setFormData({...formData, price: e.target.value})} value={formData.price} type="text" id="form2" class="form-control validate" />
        <br></br>

        <label data-error="wrong" data-success="right" for="form2">QUANTITY</label>
        <input onChange={(e)=>setFormData({...formData, quantity: e.target.value})} value={formData.quantity} type="text" id="form2" class="form-control validate" />
        <br></br>
        <input type="file" onChange={handleFileInput}/>
        <button type="button" className='btn btn-default' onClick={() => uploadFile1(selectedFile)}> Upload to S3</button>
        </div>

      </div>
      <div class="modal-footer d-flex justify-content-center">
      <button type="button" onClick={handleAddItem} data-dismiss="modal" aria-label="Close">SEND</button>
      </div>
    </div>
  </div>
</div>
{/* 
<div class="text-center">
  <Link to="/addShop" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalSubscriptionForm">FILL IN ITEM DETAILS</Link>
</div> */}

    </div>
  )
}

export default PopUpForm;
