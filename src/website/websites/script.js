let disableButton = true;
function toggleCreatePopup() {
    toggleNavButtons();
    document.getElementById("createCustomerID").classList.toggle("active");
    document.getElementById("wrapperID").classList.toggle("blur");
}

function toggleCheckCustomerPopup() {
    toggleNavButtons();
    document.getElementById("validateCustomerNumberID").classList.toggle("active");
    document.getElementById("wrapperID").classList.toggle("blur");
}

function toggleNavButtons() {
    document.getElementById("navCreateButtonID").disabled = disableButton;
    document.getElementById("navCheckButtonID").disabled = disableButton;
    document.getElementById("navCreateButtonID").classList.toggle("disabled");
    document.getElementById("navCheckButtonID").classList.toggle("disabled");
    disableButton = !disableButton;
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("customer_number").value = "";
}

async function getAllCustomers() {
    try {
        const response = await fetch("http://localhost:3000/customers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        return await response.json();

    } catch (error) {
        console.error(error);
    }
}

async function createCustomer() {
    const form = document.getElementById("createForm");
    const formData = new FormData(form);

    const data = {
        name: formData.get("customer_name"),
        email: formData.get("customer_email"),
        phone: formData.get("customer_phone")
    };

    try {
        const response = await fetch("http://localhost:3000/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    toggleCreatePopup();
}

async function checkCustomer() {
    const customer_number = document.getElementById("customer_number").value;
    try {
        const response = await fetch("http://localhost:3000/validate/" + customer_number, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const result = await response.json();

        if (result === true) {
            console.log(true)
        }
        else if (result === false) {
            console.log(false)
        }

    } catch (error) {
        console.error(error);
    }

    toggleCheckCustomerPopup();
}


function toggleCheckMark() {
    document.getElementById("checkMark").classList.toggle("active");
}

function toggleCross() {
    document.getElementById("cross").classList.toggle("active");
}