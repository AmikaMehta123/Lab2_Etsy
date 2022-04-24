import React from 'react';
import {Redirect, Link} from 'react-router-dom';

export const EditItems = () => {
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
        <div class="card mb-2">
            <div class="card-header" align="center"><bold><u>EDIT ITEMS</u></bold></div>
            <br></br>
            
            <div class="card-body text-center">
            
            <img class="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
            <button class="btn btn-primary" type="button">UPLOAD A PRODUCT PICTURE</button>
            <br></br>
            
        </div>
            <div class="card-body">
                <form>
                    <div class="mb-12">
                        <label class="small mb-1" for="inputname">Item Name ::</label>
                        <input id="addShop" type="text" placeholder="Item Name"/>
                        <br>
                        </br>
                        <br>
                        </br>
                        <label class="small mb-1" for="inputname">Shop Name ::</label>
                        <input id="addShop" type="text" placeholder="Shop Name"/>
                        <br>
                        </br>
                        <br></br>
                        <label class="small mb-1" for="inputname">Category ::</label>
                        <input id="addShop" type="text" placeholder="Category"/>
                        <br></br>
                        <br></br>
                        <label class="small mb-1" for="inputname">Description ::</label>
                        <input id="addShop" type="text" placeholder="Description"/>
                        <br></br>
                        <br></br>
                        <label class="small mb-1" for="inputname">Price ::</label>
                        <input id="addShop" type="text" placeholder="Price"/>
                        <br></br>
                        <br></br>
                        <label class="small mb-1" for="inputname">Quantity ::</label>
                        <input id="addShop" type="text" placeholder="Quantity"/>
                    </div>
                    <br></br>
                    <Link to="/"> <button  class="btn btn-primary" align="right" type="button">UPDATE ITEMS</button></Link>
                    
                    <br></br>
                    
                </form>
            </div>
        </div>
    </div>
</span>
</div>


)
}

export default EditItems;
