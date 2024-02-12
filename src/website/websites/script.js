function toggleCreatePopup() {
    document.getElementById("createCustomerID").classList.toggle("active");
    document.getElementById("wrapperID").classList.toggle("blur");
}

function toggleCheckCustomerPopup() {
    document.getElementById("validateCustomerNumberID").classList.toggle("active");
    document.getElementById("wrapperID").classList.toggle("blur");
}

function createCustomer() {
    toggleCreatePopup();
}
