import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdminScreen from "./screens/AdminScreen";
import Axios from "axios";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import WishListScreen from "./screens/WishListScreen";
import AddReviewScreen from "./screens/AddReviewScreen";
import Readme from "./screens/Readme.js";

function App() {
  const [username, setUserName] = useState(undefined);
  const [cartCount, setCartCount] = useState(0);

  useEffect(async () => {
    try {
      const result = await Axios.get("/api/getUserDetails");
      const { username } = result.data;
      const { cartSize } = result.data;
      setUserName(username);
      setCartCount(cartSize);
    } catch (e) {
      console.log(e.response.data.validationError);
      setUserName(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Sticker'sForGeeks
            </Link>
          </div>
          <div>
            <Link to="/wishlist">
              <i className="fa fa-heart" aria-hidden="true"></i>
            </Link>
            <Link to="/cart">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i><span className="badge">{cartCount}</span>
            </Link>
            <Link to={username ? "/logout" : "/login"}>
              {username === undefined ? (
                "..."
              ) : username === null ? (
                <i className="fa fa-sign-in" aria-hidden="true">
                  <span className="userName"> login</span>
                </i>
              ) : (
                <i className="fa fa-sign-out" aria-hidden="true">
                  <span className="userName"> Hi, {username}</span>
                </i>
              )}
            </Link>
            {username === null && (
              <Link to="/register">
                <span className="userName">Register</span>
              </Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/addReview/:id" component={AddReviewScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/logout" component={LogoutScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/admin" component={AdminScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/Payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/orderScreen" component={OrderScreen}></Route>
          <Route path="/wishlist/:id?" component={WishListScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/readme.html" component={Readme} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
