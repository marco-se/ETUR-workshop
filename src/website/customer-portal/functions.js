async function GetAllOpenReports(customerId) {
    try {
        const response = await fetch(`http://localhost:3001/customer/${customerId}/reports`, {
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
        reports.forEach(report => {
            openReports.push(report);
        })
        let cards = "";

        openReports.forEach(report => {
            cards += `<div class="card">
                <span>Category: ${report.category}</span>
                <span>Description: ${report.description}</span>
                <span>Labels: ${report.labels}</span>
                <span>State: ${report.state}</span>`;
            if(report.state === "Closed") {
                cards += `<span>Close reason: ${report.closeReason}</span>`;
            }
            cards += `<span>Comments: ${report.comments}</span>
                </div>`;
        });
        document.getElementById("cards").innerHTML = cards;

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
    getAllCustomers();
    toggleCreatePopup();
}