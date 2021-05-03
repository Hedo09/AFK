const BASE_URL = "http://localhost:8081/api";
const CATEGORIES_URL = BASE_URL + '/categories';
const ORDER_URL = BASE_URL + "/orders";
const CHAT_URL = "ws://localhost:8081/chat";
const LOGIN_URL = BASE_URL + "/login";
const SIGNIN_URL = BASE_URL + "/signin";
const USERS_URL = BASE_URL + "/users";
const ME_URL = BASE_URL+ "/me";
const TEMPERATURE_URL = BASE_URL + "/measurements/temperature";
const HUMIDITY_URL = BASE_URL + "/measurements/humidity";
const SoilMoisture_URL = BASE_URL + "/measurements/soilmoisture";
const RPIDATA_URL = BASE_URL + "/rpidatas";
const DELETESER_URL = BASE_URL + "/deleteuser";

export default {BASE_URL, CATEGORIES_URL, ORDER_URL, CHAT_URL,LOGIN_URL,SIGNIN_URL,USERS_URL,ME_URL,TEMPERATURE_URL,HUMIDITY_URL,SoilMoisture_URL,RPIDATA_URL,DELETESER_URL};