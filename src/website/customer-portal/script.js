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


// functions for actual website
function toggleCheckCustomerPopup() {
    document.getElementById("loginPopupID").classList.toggle("disable");
    document.getElementById("wrapperID").classList.toggle("blur");
}

function login() {
    
// if login is true it toggles the popup
    toggleCheckCustomerPopup()
}