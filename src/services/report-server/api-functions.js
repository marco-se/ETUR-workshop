import { getReportId, increaseReportId, reportArray } from "./data-model/report-model.js"

export function GetAllCustomerReports(id) {
    return reportArray.filter((element) => element.customerId === id);
}

export function CreateCustomerReport(category, customerId, description) {
    reportArray.push({
        id: getReportId(),
        category: category,
        customerId: customerId,
        description: description,
        createdAt: getCurrentDateTimeFormatted(),
        state: "Open",
        owner: "Product Manager"
    });

    increaseReportId();
}

export function GetAllDeveloperReports(name) {
    return reportArray.filter((element) => element.assignedTo === name);
}

export function EditReportAsDeveloper(name, id, closeReason) {
    let report = reportArray.find(report => report.id === id);
    if(report === undefined) {
        return new Error("There is no report with this id");
    }
    if(report.assignedTo !== name) {
        return new Error("Developer is not assigned to this report.");
    }
    report.state = "Closed";
    report.closedAt = getCurrentDateTimeFormatted();
    report.closeReason = closeReason;
}

export function GetAllReports() {
    return reportArray;
}

export function EditReportAsManager(id, assignedTo, priority, comment) {
    let report = reportArray.find(report => report.id === id);
    if(report === undefined) {
        return new Error("There is no report with this id");
    }
    report.editedAt = getCurrentDateTimeFormatted();
    report.assignedTo = assignedTo;
    report.priority = priority;
    if(report.comments === undefined) {
        report.comments = [];
    }
    report.comments.push(comment);
}

function getCurrentDateTimeFormatted() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;
}