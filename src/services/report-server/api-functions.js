import { getReportId, increaseReportId, reportArray } from "./data-model/report-model.js"

export function GetAllCustomerReports(id) {
    return reportArray.filter((report) => report.customerId === id);
}

export function GetAllDeveloperReports(name) {
    return reportArray.filter((report) => report.assignedTo === name);
}

export function GetAllReports() {
    return reportArray;
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

export function CreateReport(category, customerId) {
    reportArray.push({
        id: getReportId(),
        category: category,
        customerId: customerId,
        owner: 'Product Manager',
        createdAt: getCurrentDateTimeFormatted()
    });
}

export function UpdateReportDescription(id, description) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }

    report.description = description;

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportLabel(id, label) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }
    if (report.labels === undefined) {
        report.labels = [];
    }

    report.labels.push(label);

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportState(id, state) {
    let report = reportArray.find(report => report.id === id);

    if (report === undefined) {
        return new Error("There is no report with this id");
    }

    report.state = state;

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportAssignedTo(id, assignedTo) {
    let report = reportArray.find(report => report.id === id);

    if (report === undefined) {
        return new Error("There is no report with this id");
    }

    report.assignedTo = assignedTo;

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportPriority(id, priority) {
    let report = reportArray.find(report => report.id === id)

    if (report === undefined) {
        return new Error("There is no report with this id");
    }

    report.priority = priority;

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportComment(id, comment) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }
    if (report.comments === undefined) {
        report.comments = [];
    }
    comment.createdAt = getCurrentDateTimeFormatted();
    report.comments.push(comment);

    report.editedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportCloseReason(id, closeReason) {
    let report = reportArray.find(report => report.id === id);

    if (report === undefined) {
        return new Error("There is no report with this id");
    }

    report.closeReason = closeReason;
    report.state = "Closed"

    report.closedAt = getCurrentDateTimeFormatted();
}

export function UpdateReportReference(id, reference) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }
    if (report.references === undefined) {
        report.references = [];
    }

    report.references.push(reference);

    report.editedAt = getCurrentDateTimeFormatted();
}