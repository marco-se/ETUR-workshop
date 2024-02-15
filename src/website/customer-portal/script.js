let currentCustomerID;

// functions for actual website
function toggleCheckCustomerPopup() {
    document.getElementById("loginPopupID").classList.toggle("disable");
    document.getElementById("wrapperID").classList.toggle("disableblur");
}

function toggleHiddenReport(id) {
    document.getElementById(id).classList.toggle("show")
}

function toggleCreateReportPopup() {
    document.getElementById("createReportPopupID").classList.toggle("notvisible");
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("label").value = "";
}

function toggleCommentPopup() {
    document.getElementById("commentPopupID").classList.toggle("notvisible");
    document.getElementById("author").value = "";
    document.getElementById("message").value = "";
    document.getElementById("type").value = "";
}

async function login() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    const formData = new FormData(form);
    currentCustomerID = formData.get("customer_number");
    
    const path = "http://localhost:3000/validate/" + currentCustomerID;

    try {
        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (result === true) {
            document.getElementById("loginResult").innerHTML = "You've been successfully loged in.";
            document.getElementById("displayCustomerID").innerHTML = currentCustomerID;
            toggleCheckCustomerPopup()
            GetAllOpenReports();
        }
        else {
            document.getElementById("loginResult").innerHTML = "This customer does not exist!";
        }
    } catch (error) {
        console.error(error);
    }
}

async function GetAllOpenReports() {
    try {
        const response = await fetch(`http://localhost:3001/customer/${currentCustomerID}/reports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const reports = await response.json();
        const openReports = [];
        console.log(reports)
        reports.forEach(report => {
            openReports.push(report);
        })
        let cards = "";
        let id = 0;
        openReports.forEach(report => {
            cards += `<div class="reportBox" id="${id}">
                <span>Category: ${report.category}</span>
                <span>Labels: ${report.labels}</span>
                <span>State: ${report.state}</span>
                <span class="hidden">Description: ${report.description}</span>
                <span class="hidden">Close reason: ${report.closeReason}</span>
                <span class="hidden">Comments: ${report.comments}</span>
                <div class="hidden"><button onclick="AddComment(${report.id})">Add Comment</button><button onclick="CloseReport(${report.id})">Close Report</button></div>
                <button onclick="toggleCommentPopup()">Add Comment</button>
                <button onclick="toggleHiddenReport(${id})">Details</button>`;

            id = id + 1;

        });

        document.getElementById("contentID").innerHTML = cards;

    } catch (error) {
        console.error(error);
    }
}

async function CreateReport() {
    const form = document.getElementById("createForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    const formData = new FormData(form);
    if (formData.get("customer_category").trim() === "" || formData.get("customer_description").trim() === "") {
        return;
    }
    
    const createData = {
        category: formData.get("customer_category"),
        customerId: currentCustomerID,
    };

    try {
        let response = await fetch("http://localhost:3001/report/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createData),
        });

        if (!response.ok) {
            throw new Error("Something went wrong at report/create");
        }
        const result = await response.json();
        console.log(result);
        if(formData.get("customer_description")) {
            const descriptionData = {
                id: result,
                description: formData.get("customer_description")
            }
            response = await fetch("http://localhost:3001/report/description", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(descriptionData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong at report/description");
            }
        }
        if(formData.get("customer_label")) {
            const labelData = {
                id: result,
                label: formData.get("customer_label")
            }
            response = await fetch("http://localhost:3001/report/label", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(labelData),
            });
            if (!response.ok) {
                throw new Error("Something went wrong at report/label");
            }
        }
    } catch (error) {
        console.error(error);
    }
    toggleCreateReportPopup();
    GetAllOpenReports();
}

async function CreateComment(reportId) {
    const form = document.getElementById("commentForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    const formData = new FormData(form);
    if (formData.get("comment_author").trim() === "" ||
        formData.get("comment_message").trim() === "" ||
        formData.get("comment_type").trim() === ""
    ) {
        return;
    }

    const data = {
        id: id,
        comment: {
            author: formData.get('comment_author'),
            message: formData.get('comment_message'),
            type: formData.get('comment_type')
        }
    };

    try {
        let response = await fetch("http://localhost:3001/report/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Something went wrong at report/create");
        }
    } catch (error) {
        console.error(error);
    }
}