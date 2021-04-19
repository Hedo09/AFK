import React, {useState} from 'react';

import './App.css';

import WebChat from "./components/WebChat";
import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import CategorySwitcher from "./components/CategorySwitcher";
import {getCartDataToPost, getCategories, getProductsPerCategory, getUsers, postData, postDataLogin} from "./util/util";
import urls from "./util/constants";
import Login from "./components/Login";
import Signin from "./components/Signin";
import LoginFailed from "./components/LoginFailed";
import Modal from "./components/Modal";

class App extends React.Component {
    state = {
        categories: [],
        products: [],
        quantities: [],
        productsInCart: [],
        cart: {},
        pageState: 'shop',
        signedin: false,
        currentUserName: "",
        currentUserPassword: "",
        authError: false
    };


    refreshCategories = () => {
        getCategories().then(response => this.setState({categories: response._embedded.categories}));
    };

    refreshProductPerCategory = () => {
        getProductsPerCategory(this.state.currentCategory).then(response => this.setState({products: response._embedded.products}));
    };

    refreshUser = (u) => {
        this.state.currentUserName = u.name;
        getUsers(u.name).then((response) => this.setState({currentUserPassword: response.password}));
    }

    categoryOnClick = (e) => {
        let categoryId = e.currentTarget.dataset.id;
        let category = this.state.categories.find(e => e.id == categoryId);
        this.setState({currentCategory: category, pageState: "shop"});
        this.state.currentCategory = category;
        this.refreshCategories();
        this.refreshProductPerCategory();

    };

    addtoCartOnClick = (e) => {
        let productId = e.currentTarget.dataset.id;
        let product = this.state.products.find(e => e.id == productId);
        let currentQuantity = this.state.cart[productId];
        if (currentQuantity === undefined)
            currentQuantity = 0;
        currentQuantity += Number(this.state.quantities[productId]);
        this.state.cart[productId] = currentQuantity;
        this.state.productsInCart.push(product);
        this.setState({
            cart: this.state.cart,
            productsInCart: this.state.productsInCart
        });
    };

    quantitiesOnChange = (e) => {
        this.state.quantities[e.currentTarget.dataset.id] = e.currentTarget.value;
        this.setState({quantities: this.state.quantities});
    };

    checkoutDataOnChange = (e) => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    checkoutOnClick = (e) => {
        console.log(this.state.customerName);
        let data = getCartDataToPost(this.state.cart, this.state.customerName, this.state.customerAddress);
        postData(urls.ORDER_URL, data);
        this.setState({quantities: [], cart: [], productsInCart: []});
        this.refreshCategories();
        this.refreshProductPerCategory();
    };

    sendUserLogin = (e) => {
        console.log(this.state.currentUserName);
        let data = {name: this.state.userName, password: this.state.password};
        const promise = postDataLogin(urls.LOGIN_URL, data);
        promise.catch(function (error) {
            if (error.response) {
                this.setState({authError: true});
            }
        });
    }

    sendUserSignin = (e) => { // TODO: ha olyan akar regizni, aki már korábban regisztrált, az nincs lekezelve.
        let data = {name: this.state.userName, password: this.state.password};
        this.state.signedin = true;
        postData(urls.SIGNIN_URL,data);

        this.state.currentUserName = this.state.userName;
        this.state.currentUserPassword = this.state.password;
    }
    userDataChange = (e) => {
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    }

    changePageState = (e) => {
        this.setState({pageState: e.currentTarget.dataset.state});
    };

    componentDidMount() {
        this.refreshCategories();
    };

    render() {
        return (
            <div>
                <CategorySwitcher click={this.categoryOnClick} categories={this.state.categories}
                                  onChangePageState={this.changePageState}/>

                {this.state.pageState === "shop" ?
                    (<ProductListing products={this.state.products} onAddToCart={this.addtoCartOnClick}
                                     onQuantityChange={this.quantitiesOnChange}/>) : ""
                }

                {(this.state.pageState === "cart" && this.state.signedin) ?
                    (<Cart cart={this.state.cart} products={this.state.productsInCart} user={this.state.currentUserName}
                           onCheckoutDataChange={this.checkoutDataOnChange} onCheckout={this.checkoutOnClick}/>) : ""
                }
                {(this.state.pageState === "cart" && !this.state.signedin) ? (<LoginFailed/>) : "" }


                {this.state.pageState === "chat" ? (<WebChat/>) : ""}

                {this.state.pageState === "login" ? (<Login onSendUser={this.sendUserLogin} onUserDataChange={this.userDataChange}/>): ""}
                {this.state.pageState === "signin" ? (<Signin onSendUser={this.sendUserSignin} onUserDataChange={this.userDataChange}/>): ""}
            </div>
        );
    }
}

export default App;
