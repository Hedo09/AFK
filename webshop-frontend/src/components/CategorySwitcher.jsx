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
                <span className="navbar-brand">Webshop</span>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    {props.categories.map(c => (<CategoryItem id={c.id} key={c.id} name={c.name} onClick={props.click}/>))}
                    <li data-state="shop" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-th"></span></a></li>
                    <li data-state="cart" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-shopping-cart"></span></a></li>
                    <li data-state="chat" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-comment"></span></a></li>
                    <li data-state="login" onClick={props.onChangePageState}><a><span className="glyphicon glyphicon-user"></span></a></li>
                </ul>
            </div>
        </div>
    </nav>
);

export default CategorySwitcher;