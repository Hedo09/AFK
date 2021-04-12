import urls from "./constants";
import axios from "axios";

const getData = (url) => {
    return axios.get(url)
        .then(response => response.data)
};

const postData = (url, body) => {
    axios.post(url, JSON.stringify(body), {headers : {"Content-Type": "application/json"}})
        .then(response => response.data)
};

const getCategories = () => getData(urls.CATEGORIES_URL);

const getProductsPerCategory = (category) => getData(urls.CATEGORIES_URL + '/' + category.id + '/products');

const getCartLinesFromCartData = (cart, products) => {
    let result = [];
    Object.keys(cart).forEach(k => {
        let product = products.find(p => p.id == k);
        let item = {...product, quantity: cart[k]};
        result.push(item);
    });
    return result;
};

const getCartDataToPost = (cart, name, address) => {
    let result = {name: name, address: address};

    let items = {};
    for (let key in cart)
        items[Number(key)] = cart[key];
    result.quantityPerProductId = items;
    return result;
};

const countSubTotal = (cart, products) => {
    let total = 0;
    Object.keys(cart).forEach(k => {
        let product = products.find(p => p.id == k);
        total += (Number(product.price) * k);
    });
    return total;
};

export {
    getData,
    postData,
    getCategories,
    getProductsPerCategory,
    getCartLinesFromCartData,
    getCartDataToPost,
    countSubTotal
}