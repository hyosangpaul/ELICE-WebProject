import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Favorites from "../Favorite/Favorites";
import logo from "../img/logo.png";
import Home from "./bodyPages/Home";
import CategoryComponents from "./bodyPages/CategoryComponents";
import RegisterForm from "../Register/RegisterForm";
import LoginForm from "../Login/LoginForm";
import ItemInfo from "./bodyPages/ItemInfo";
import Payments from "./bodyPages/Payments";
import Cart from "./bodyPages/Cart";
import Order from "./bodyPages/Order";
import OrderComplete from "./bodyPages/OrderComplete";
import OrderList from "./bodyPages/OrderList";
import UserMain from "../User/UserMain";
import UserInfo from "../User/UserInfo";
import UserUpdate from "../User/UserUpdate";
import AdminMain from "./Admin/AdminMain";
import AdminOrders from "./Admin/AdminOrders";
import AdminCategories from "./Admin/AdminCategories";
import AdminProducts from "./Admin/AdminProducts";
import AddCategory from "./Admin/AddCategory"
import AddProduct from "./Admin/AddProduct"
import EditCategory from "./Admin/EditCategory"
import EditProduct from "./Admin/EditProduct"
import UserDelete from "../User/UserDelete";
import DirectOrder from "./bodyPages/DirectOrder";
import DirectPayments from "./bodyPages/DirectPayment";

const Container = styled.div`
  display: flex;
  margin: 10px 80px;

  & a {
    text-decoration: none;
    color: black;
  }

`;
const LogoDiv = styled.div`
  margin: 10px 50px;
  & img {
    width: 70px;
    height: 70px;
  }
`;

const NavUl = styled.ul`
  align-self: center;
  list-style-type: none;
  & li {
    margin-right: 20px;
    display: inline;
  }
`;

const IconUl = styled.ul`
  align-self: center;
  margin-left: auto;
  display : flex;
  list-style-type: none;
  & li {
    display: inline;
  }
`;

const BodyRoutes = () => {
  const Token = localStorage.getItem("accessToken");
  const AdminToken = localStorage.getItem("adminToken");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/categories`)
      .then((response) => {
        setCategories(response.data.searchAll);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <Router>
        <Container>
          <LogoDiv>
            <NavLink to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </LogoDiv>
          <NavUl>
            {categories.map((category) => {
              return (
                <li key={category.categoryId}>
                  {AdminToken || !AdminToken === "null" ? <></> : <NavLink to={`/categories/${category.categoryId}`}>{category.name}</NavLink> }
                </li>
              );
            })}
            {/* AdminToken??? admin????????? ?????????????????? ?????? */}
            {/* <></>??? ?????? ?????? ???????????? ????????? ????????? ??? ????????? ?????? */}
            <li>{AdminToken || !AdminToken === "null" ? <NavLink to="/AdminMain">??????????????????</NavLink> : <></>}</li>
          </NavUl>
          <IconUl>
            {/* admin?????? ??????????????? ?????? x , ???????????? usermain, ??????????????? loginForm >> ?????? ???????????? ?????? ???????????? ????????? ????????? ???????????? ?????? ?????? ??? ??? ????????? ?????? */}
            {AdminToken || !AdminToken === "null" ? (
              <></> 
            ) : (
              <li>
                {Token || !Token === "null" ? (
                  <div>
                  <NavLink to="/UserMain">
                    <span className="material-symbols-outlined">person</span>
                  </NavLink>
                  <NavLink to="/Favorites">
                  <span className="material-symbols-outlined" style = {{
                    margin : '10px'
                  }}>favorite</span>
                  </NavLink>
                  <NavLink to="/payments/cart">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  </NavLink>
                  </div>
                ) : (
                  <div>
                  <NavLink to="/LoginForm">
                    <span className="material-symbols-outlined">person</span>
                  </NavLink>
                  <NavLink to="/Favorites">
                  <span className="material-symbols-outlined" style = {{
                    margin : '10px'
                  }}>favorite</span>
                  </NavLink>
                  <NavLink to="/payments/cart">
                  <span className="material-symbols-outlined">shopping_bag</span>
                  </NavLink>
                  </div>
                )}
              </li>
            )}
            <li>
              {AdminToken || !AdminToken === "null" ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("adminToken");
                    alert("????????? ???????????? ???????????????.");
                    window.location.href = "/";
                  }}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    borderColor: "white",
                    backgroundColor: "grey",
                    color: "white",
                  }}
                >
                  ????????? ????????????
                </button>
              ) : ( <></>
              )}
            </li>
          </IconUl>
        </Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/OrderList" element={<OrderList />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/UserUpdate" element={<UserUpdate />} />
          <Route path="/UserDelete" element={<UserDelete />} />
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/UserMain" element={<UserMain />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/categories/:categoryId" element={<CategoryComponents />} />
          <Route path="/itemInfo/:id" element={<ItemInfo />} />
          <Route path="orderComplete" element={<OrderComplete />} />
          <Route path="/payments/*" element={<Payments />}>
            <Route path="cart" element={<Cart />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/DirectPayments/*" element={<DirectPayments />}>
            <Route path="DirectOrder" element={<DirectOrder />} />
          </Route>
          {/* ?????????????????? */}
          <Route path="/AdminMain" element={<AdminMain />} />
          <Route path="/adminOrders" element={<AdminOrders />} />
          <Route path="/adminCategories" element={<AdminCategories />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/editCategory/:categoryId" element={<EditCategory />} />
          <Route path="/adminProducts/:categoryId" element={<AdminProducts />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
};

export default BodyRoutes;
