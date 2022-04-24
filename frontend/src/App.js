import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { LoginContext } from './contexts/LoginContext';
import ShoppingPageOverview from './components/ShoppingPageOverview';
import { ShoppingPageOverviewContext } from './contexts/ShoppingPageOverviewContext';


function App() {

  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [shopItem, setShopItem] = useState([]);
  const [quantity,setQuantity] = useState([]);
  

  return (
    <div className='App'>
      <LoginContext.Provider value={{user, setUser}}>
        <ShoppingPageOverviewContext.Provider value={{cart, setCart, shopItem, setShopItem, quantity,setQuantity}}>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route 
                exact 
                key={index} 
                path={route.path} 
                render={(props)=><route.component {...props} />}
              ></Route>
            ))}
          </Switch>
        </Router>
        </ShoppingPageOverviewContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
