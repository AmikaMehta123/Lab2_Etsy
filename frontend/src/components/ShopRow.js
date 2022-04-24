import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import S3FileUpload from 'react-s3';
import config from './awsConfig';
import axios from 'axios';
import backendURL from '../config';

const ShopRow = (props) => {
    console.log(props)
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const shop = props.shop;
    const [selectedFile, setSelectedFile] = useState(shop.image);
    
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile1 = (file) => {
       S3FileUpload.uploadFile(file, config)
       .then((data)=> {
        setSelectedFile(data.location)
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post(`${backendURL}/editImage`, {...shop, img: data.location}).then((res) => {
            if (res.status==200){
                alert("Edited Image")
                // console.log(shops);
            } else {
                alert("Image not edited")
            }
        }).catch((err) => console.log(err));
       }).catch( (err)=>{
           alert(err)
       })
    }
    const shopModalID = `#shopmodal${shop.id}`
    console.log(shopModalID)
  return (<>
    <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-8'>
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-2">
                <img src={selectedFile} class="card-img" alt="..." width={150} height={150}/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{shop.shop}</h5>
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <label>Owner: {shop.owner}</label>
                        </div>
                        <div className='col-sm-4'></div>
                        <div className='col-sm-4'>
                            <label>Sale Count: {shop.sale_count}</label>
                        </div>
                    </div>
                    
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-4'>
                        <input type="file" onChange={handleFileInput}/>
                        <button onClick={() => uploadFile1(selectedFile)} type="button" >EDIT IMAGE</button>
                        {/* <button>EDIT IMAGE</button> */}
                        </div>
                        <div className='col-sm-4'>
                       <button data-toggle="modal" data-target={shopModalID}>ADD ITEM</button>
                        </div>
                        <div className='col-sm-4'>
                        <Link to= {{
                            pathname: "/viewitem", 
                            state: {
                                shop: shop.shop
                            }}}><button>VIEW ITEM</button></Link>
                        </div>
                    </div>
                    <br></br>
                    
                    

                 
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <br></br>

    </>
  )
}

export default ShopRow;