import React, {useState} from 'react';

import './App.css';

import WebChat from "./components/WebChat";
import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import CategorySwitcher from "./components/CategorySwitcher";
import {getCartDataToPost, getCategories, getProductsPerCategory, getUsers, postData, postDataLogin,getTemperatures,getHumidity,getSoilMoisture,getRpiDatas,postDataDelete} from "./util/util";
import urls from "./util/constants";
import Login from "./components/Login";
import Signin from "./components/Signin";
import LoginFailed from "./components/LoginFailed";
import Logout from "./components/Logout";
import RpiData from "./components/RpiData";
import Humidity from "./components/Humidity";
import SoilMoisture from "./components/SoilMoisture";
import Temperature from "./components/Temperature";
import User from "./components/User";

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
        authError: false,
        temperatures: [],
        humidities: [],
        soilmoistures: [],
        rpiData: [],
        users: []
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

    refreshTemperature = () => {
        getTemperatures().then(response => this.setState({temperatures: response}));
        console.log(this.state.temperatures);
    }

    refreshHumidity = () => {
        getHumidity().then(response => this.setState({humidities: response}));
        console.log(this.state.humidities);
    }

    refreshSoilMoisture = () => {
        getSoilMoisture().then(response => this.setState({soilmoistures: response}));
        console.log(this.state.soilmoistures);
    }

    refreshRpiData = () => {
        getRpiDatas().then(response => this.setState({rpiData: response}));
        console.log(this.state.rpiData);
    }
    showUsers = () => {
        getUsers().then(response => this.setState({users: response}));
        console.log(this.state.users);
    }

    deleteUser = (name) => {
        let auth = {name: this.state.currentUserName, password: this.state.currentUserPassword};
        postDataDelete(urls.DELETESER_URL,auth,name);
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
        let data = {name: this.state.userName, password: this.state.password};
        const promise = postDataLogin(urls.LOGIN_URL, data);
        promise.then(res => {
            this.setState({currentUserName: this.state.userName, currentUserPassword: this.state.password});
            this.setState({signedin: true});
        }).catch((e) =>
        {
            if(e.response) {
                this.setState({signedin: false});
            }
        });
    }

    sendUserSignin = (e) => { // TODO: ha olyan akar regizni, aki már korábban regisztrált, az nincs lekezelve.
        let data = {name: this.state.userName, password: this.state.password};
        postData(urls.SIGNIN_URL,data);
    }

    userLogoutYes = (e) => {
        this.setState({signedin: false, currentUserName: "", currentUserPassword: ""});
        this.setState({pageState: "login"});
    };
    userLogoutNo = (e) => {
        this.setState({pageState: "login"});
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
                                  onChangePageState={this.changePageState} isSigned={this.state.signedin}/>

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
                {this.state.pageState === "logout" ? (<Logout onLogoutYes={this.userLogoutYes} onLogoutNo ={this.userLogoutNo} />):""}
                {this.state.pageState === "rpidata"? (<RpiData onGetData ={this.refreshRpiData} rpidata={this.state.rpiData}/>):""}
                {this.state.pageState === "humidity"? (<Humidity onGetData ={this.refreshHumidity} humidities={this.state.humidities}/>):""}
                {this.state.pageState === "soilmoisture"? (<SoilMoisture onGetData ={this.refreshSoilMoisture} soilmoistures={this.state.soilmoistures}/>):""}
                {this.state.pageState === "temperature"? (<Temperature onGetData ={this.refreshTemperature} temperatures={this.state.temperatures}/>):""}
                {this.state.pageState === "users"? (<User onGetData ={this.showUsers} onDeleteUser={this.deleteUser.bind(this)} users={this.state.users}/>):""}
            </div>
        );
    }
}

export default App;
