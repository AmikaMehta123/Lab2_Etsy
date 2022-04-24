import React, {useState, useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import backendURL from '../config';
import { LoginContext } from '../contexts/LoginContext';
import { HeaderBottom } from './HeaderBottom';
import S3FileUpload from 'react-s3';
import config from './awsConfig';

const UpdateProfile = () => {
    window.Buffer = window.Buffer || require("buffer").Buffer;

    const {user} = useContext(LoginContext);
    const history = useHistory();
	//Set all initial states to blank
	let initialState = {
		dob: '',
        city: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        country: ''
	}
    //use state 
	const [formData, setFormData] = useState(initialState);
	
    const [selectedFile, setSelectedFile] = useState("http://bootdey.com/img/Content/avatar/avatar1.png");
    
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile1 = (file) => {
       S3FileUpload.uploadFile(file, config)
       .then((data)=> {
           setSelectedFile(data.location)
           alert("Image Uploaded")
        console.log(data.location)
       }).catch( (err)=>{
           alert(err)
       })
    }

    //function for accessing backend data
    
	const handleUpdateProfile = (e) => {
		e.preventDefault();
        setFormData({...formData, name: user});
		console.log(formData);

        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
		axios.post(`${backendURL}/updateProfile`,{...formData, img: selectedFile}).then((res) => {
			if (res.status==200){
                console.log("Updated Profile!");
                alert("profile updated")
                history.push("/")
			} else {
                console.log("Internal Server Error")
			}
		}).catch((err) => console.log(err));
	}

    const getData = () => {
        axios.post(`${backendURL}/getUser`,{name: user}).then((res) => {
			if (res.status==200){
                setFormData(res.data.result[0])
                setSelectedFile(res.data.result[0].picture)
                console.log(res.data.result[0])
			} else {
				console("User doesn't exists.")
			}
		}).catch((err) => console.log(err));
    }

    useEffect(()=>{
        getData();
    },[])

    return (
            <div>

                    
            <div class="row">
                

                <div class="card mb-4 mb-xl-0">
                    <div class="card-header">UPDATE USER PROFILE</div>
                                <div align="left"> 
                            
                                <Link to="/"> <button  class="btn btn-primary" align="right" type="button">Dashboard</button></Link>
                                </div>
                    
                    <div class="card-body text-center">
                        
                        <img class="img-account-profile rounded-circle mb-2" src={selectedFile} alt="" width={100} height={150}/>
                        <input type="file" onChange={handleFileInput}/>
                        <button onClick={() => uploadFile1(selectedFile)}>UPLOAD IMAGE</button>
                        
                        <br></br>
                        
                    </div>
                </div>
            </div>
                <span align="center">
                <div class="col-xl-6">
                    <div class="card mb-2">
                        <div class="card-header" align="center">ACCOUNT DETAILS</div>
                        <br></br>
                        <div class="card-body">
                            <form onSubmit={handleUpdateProfile}>
                                <div class="mb-12">
                                    <label class="small mb-1" for="inputname">NAME : {user}</label>
                                    
                                    <br>
                                    </br>
                                </div>
                                <div class="row gx-3 mb-3">
                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputdob">DATE OF BIRTH (MM/DD/YYYY)</label>
                                        <input onChange={(e)=>setFormData({...formData, dob: e.target.value})} value={formData.dob} id="updatedob" type="text" placeholder="DOB"/>

                                        <label class="small mb-1" for="inputemail">E-MAIL</label>
                                        <input onChange={(e)=>setFormData({...formData, email: e.target.value})} value={formData.email} id="updateemail" type="email" placeholder="email"/>
                                    </div>
                                </div>
                                <br></br>
                                
                                <div class="row gx-3 mb-3">
                                    <div class="col-md-6">
                                    <label class="small mb-1" for="inputgender">GENDER</label>
                                    <input onChange={(e)=>setFormData({...formData, gender: e.target.value})} value={formData.gender} id="updategender" type="text" placeholder="gender"/>
                                    <br></br>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputphone">PHONE NUMBER</label>
                                            <input onChange={(e)=>setFormData({...formData, phone: e.target.value})} value={formData.phone} id="updatephone" type="text" placeholder="phone"/>
                                        </div>
                                        <br></br>
                                        <div class="col-md-6">
                                            <label class="small mb-1" for="inputaddress">ADDRESS</label>
                                            <input onChange={(e)=>setFormData({...formData, address: e.target.value})} value={formData.address} id="updateaddress" type="text" placeholder="address"/>
                                        </div>
                                        <br></br>
                                        <div class="col-md-6">
                                        <label class="small mb-1" for="inputcity">CITY</label>
                                        <input onChange={(e)=>setFormData({...formData, city: e.target.value})} value={formData.city} id="updatecity" type="text" placeholder="city"/>
                                        <br>
                                        </br>

                                        <label class="small mb-1" for="inputcountry">CITY</label>
                                        <input onChange={(e)=>setFormData({...formData, country: e.target.value})} value={formData.country} id="updatecountry" type="text" placeholder="country"/>
                                
                                        </div>
                                    </div>
                                    </div>
                                    
                                
                                <br></br>
                                
                                <button class="btn btn-primary" type="button" onClick={handleUpdateProfile}>SAVE CHANGES</button>
                                <br></br>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </span>
            </div>
    )
}

export default UpdateProfile;
