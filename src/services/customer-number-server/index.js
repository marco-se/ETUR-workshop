import { GetAllCustomer, CreateCustomer, GetCustomer, RemoveCustomer } from "./customer.js";

const message = "Hello World";
console.log(message);
console.log("Created:", CreateCustomer("Tom", "tom@example.com", "1234567890"))
console.log("Created:", CreateCustomer("Otto", "otto@example.com", "2345678901"))
const index = Math.round(Math.random() * 2)
console.log("Removed:", RemoveCustomer("ETUR-CN-" + index));
console.log("All:", GetAllCustomer());