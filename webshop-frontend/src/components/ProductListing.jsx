import React from 'react';
import ProductItem from "./ProductItem";

const ProductListing = (props) => (
    <div className="row">
        {props.products.map(p => <ProductItem key={p.id} id={p.id} name={p.name} description={p.description}
                                              price={p.price} onClick={props.onAddToCart} onChange={props.onQuantityChange}/>)}
    </div>
);

export default ProductListing;