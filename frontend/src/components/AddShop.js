import React, {useState, useContext} from 'react'
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';
import backendURL from '../config';
import config from './awsConfig'
import shop_page from '../assets/shop_page.JPG'
import S3FileUpload from 'react-s3'
import shop_image_third from '../assets/shop_image_third.JPG'
import PopUpForm from './PopUpForm';
import { LoginContext } from '../contexts/LoginContext';

const AddShop = (props) => {

    const {user} = useContext(LoginContext)
    const name = props.location.state.name
    const history = useHistory();
    let initialState = {
		shop: name,
        owner: user,
	}
    
    const [selectedFile, setSelectedFile] = useState(null);
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }
  
	const [shopData, setShopData] = useState(initialState);
	const [photoSrc, setPhotoSrc] = useState("http://bootdey.com/img/Content/avatar/avatar1.png");
    const addShopInDB = () => {
        
        axios.post(`${backendURL}/createShopPage`,{...shopData, img: photoSrc}).then((res) => {
			if (res.status==200){
                alert("Added a Shop");
                history.push("/")
			} else {
                console.log("Internal Server Error")
			}
		}).catch((err) => console.log(err));
    }

    const uploadFile1 = (file) => {
        S3FileUpload.uploadFile(file, config)
        .then((data)=> {
         setPhotoSrc(data.location)
        }).catch( (err)=>{
            alert(err)
        })
     }
     

  return (
<div>

<div class="row">
    

      <div class="card mb-4 mb-xl-0">
          
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
                
            </div>
        </div>
    </div>



          
          
      </div>
  </div>

  
  <span align="center">
      <div class="col-xl-6">
      <div class="card-header" align="center"><bold><u>ADD A NEW SHOP</u></bold>
          <div class="card mb-2">
              <img src={shop_page} alt="" border = "rounded"/>
              <img src={shop_image_third} alt="" border = "rounded"/>
              </div>
              <br></br>
              <br></br>
              <div class="card-body text-center">
              
              <img class="img-account-profile rounded-circle mb-2" src={photoSrc} alt="" />
              <input type="file" onChange = {handleFileInput} />
              <button class="btn btn-primary" type="button" onClick={() => uploadFile1(selectedFile)}>UPLOAD A SHOP PICTURE</button>
              <br></br >
              
          </div>
              <div class="card-body">
                  <form>
                      <div class="mb-12">
                          <label class="small mb-1" for="inputname">SHOP NAME :: {name}</label>
                          {/* <input value={shopData.shop} id="addShop" type="text" placeholder="Shop Name"/> */}
                          <br>
                          </br>
                          <br>
                          </br>
                          <label class="small mb-1" for="inputname"><b>SHOP OWNER :: {user}</b></label>
                          {/* <input onChange={(e)=>setShopData({...shopData, owner: e.target.value})} value={shopData.owner} id="addShop" type="text" placeholder="Shop Owner"/> */}
                          <br>
                          </br>
                             <br></br>
                      </div>
                      
                      <button onClick={()=>addShopInDB()} class="btn btn-primary" type="button">ADD SHOP</button>
                  </form>
              </div>
          </div>
      </div>
  </span>

    {/* <PopUpForm /> */}



</div>


  )
}

export default AddShop;
