import { getReportId, increaseReportId, reportArray } from "./data-model/report-model.js"

export function GetAllCustomerReports(id) {
    return reportArray.filter((report) => report.customerId === id);
}

export function CreateCustomerReport(category, customerId, description, label) {
    if (label === undefined) {
        label = [];
    }
    else {
        label = [label];
    }
    reportArray.push({
        id: getReportId(),
        category: category,
        customerId: customerId,
        description: description,
        label: label,
        createdAt: getCurrentDateTimeFormatted(),
        state: "Open",
        owner: "Product Manager"
    });

    increaseReportId();
}

export function GetAllDeveloperReports(name) {
    return reportArray.filter((report) => report.assignedTo === name);
}

export function EditReportAsDeveloper(name, id, closeReason, comment) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }
    if (report.assignedTo !== name) {
        return new Error("Developer is not assigned to this report.");
    }
    if (report.comments === undefined) {
        report.comments = [];
    }
    if (comment !== undefined) {
        comment.createdAt = getCurrentDateTimeFormatted();
        comment.type = "product manager";
        report.comments.push(comment);
    }
    report.state = "Closed";
    report.closedAt = getCurrentDateTimeFormatted();
    report.closeReason = closeReason;
}

export function GetAllReports() {
    return reportArray;
}

export function EditReportAsManager(id, assignedTo, priority, comment, reference) {
    let report = reportArray.find(report => report.id === id);
    if (report === undefined) {
        return new Error("There is no report with this id");
    }
    report.editedAt = getCurrentDateTimeFormatted();
    report.assignedTo = assignedTo;
    report.priority = priority;

    if (report.comments === undefined) {
        report.comments = [];
    }
    if (comment !== undefined) {
        comment.createdAt = getCurrentDateTimeFormatted();
        comment.type = "product manager";
        report.comments.push(comment);
    }

    if (report.references === undefined) {
        report.references = [];
    }
    if (reference !== undefined) {
        report.references.push(reference);
    }
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