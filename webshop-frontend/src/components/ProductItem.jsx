import React from 'react';

const ProductItem = (props) => (
    <div id={props.id} className="panel-group col-sm-4 col-lg-3">
        <div className="panel panel-default">

            <div className="panel-heading">{props.name}</div>

            <div className="panel-body">
                <p>{props.description}</p>

                <p>{props.price}</p>
                <p><input type="text" className="form-control quantity-input" data-id={props.id} onChange={props.onChange}/>
                    <button className="btn btn-default" onClick={props.onClick} data-id={props.id}><span className="glyphicon glyphicon-shopping-cart"/></button>
                </p>
            </div>
        </div>
    </div>
);

export default ProductItem;