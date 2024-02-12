let globalCounter = 1
const customer = {
    id: "ETUR-CN-0",
    name: "John",
    email: "john@example.com",
    phone: "0123456789"
}

const customerArray = [customer]

export function GetAllCustomer() {
    return customerArray
}

export function CreateCustomer(name, email, phone) {
    const newCustomer = {id: "ETUR-CN-" + globalCounter, name, email, phone}
    customerArray.push(newCustomer)
    globalCounter++
    return newCustomer
}

export function GetCustomer(id) {
    return customerArray.find(customer => customer.id === id)
}

export function RemoveCustomer(id) {
    const index = customerArray.findIndex(customer => customer.id === id)
    if(index !== -1) {
        return customerArray.splice(index, 1)
    }
    return undefined
}

export function ValidateCustomerNumber(id) {
    const pattern = /ETUR-CN-\w+/;
    const isValid = pattern.test(id)
    if(!isValid) {
        return false
    }
    if(GetCustomer(id) !== undefined) {
        return true
    }
    return false
}