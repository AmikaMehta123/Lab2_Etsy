import React from 'react'
import { Link } from 'react-router-dom'
export const HeaderBottom = () => {
  return (
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
                        <li><Link to="/checkname">ADD SHOP</Link></li>
                        <li><Link to="/viewshop">VIEW SHOP</Link></li>
                        
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="search_box pull-right">
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
