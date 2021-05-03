import React from 'react';
import CategoryItem from "./CategoryItem";

const CategorySwitcher = (props) => (
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    {props.categories.map(c => (<CategoryItem id={c.id} key={c.id} name={c.name} onClick={props.click}/>))}
                    <li data-state="cart" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
                    <li data-state="chat" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-comment"></span></a></li>
                    <li data-state="rpidata" onClick={props.onChangePageState} className="rpidata"><a className="nav-link">Rpi Data</a></li>
                    <li data-state="temperature" onClick={props.onChangePageState} className="temprerature"><a className="nav-link">Temperature</a></li>
                    <li data-state="humidity" onClick={props.onChangePageState} className="humidity"><a className="nav-link">Humidity</a></li>
                    <li data-state="soilmoisture" onClick={props.onChangePageState} className="soilmoisture"><a className="nav-link">Soil Moisture</a></li>
                    <li data-state="login" onClick={props.onChangePageState} className="login"><a className="nav-link">Login</a></li>
                    <li data-state="signin" onClick={props.onChangePageState} className="signin"><a className="nav-link">Sign In</a></li>
                    <li data-state="logout" onClick={props.onChangePageState} className="logout"><a className="nav-link">Logout</a></li>
                    <li data-state="users" onClick={props.onChangePageState} className="users"><a className="nav-link">Users</a></li>
                </ul>
            </div>
        </div>
    </nav>
);

export default CategorySwitcher;