import React from 'react';
import {countSubTotal, getCartLinesFromCartData} from "../util/util";
import CartEntry from "./CartEntry";

const Cart = (props) => (
    <div className="jumbotron">
        <h2>Your cart({props.user})</h2>

        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
            </tr>
            </thead>
            <tbody>
            {
                getCartLinesFromCartData(props.cart, props.products).map(k =>
                    <CartEntry key={k.id} name={k.name} description={k.description}
                               price={k.price} quantity={k.quantity}/>)}
            </tbody>
        </table>
        <div>
            <span>Total: {countSubTotal(props.cart, props.products)}</span>
        </div>
        <div>
            <div className="form-group">
                <label htmlFor="customerName">Name:</label>
                <input type="text" className="form-control" id="customerName" onChange={props.onCheckoutDataChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="customerAddress">Address:</label>
                <input type="text" className="form-control" id="customerAddress" onChange={props.onCheckoutDataChange}/>
            </div>
            <button className="btn btn-success" onClick={props.onCheckout}><span className="glyphicon glyphicon-ok-circle"></span> Check out
            </button>
        </div>
    </div>
);

export default Cart;