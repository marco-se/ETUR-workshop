let reportId = 1;
export function getReportId() {
    return reportId;
}
export function increaseReportId() {
    reportId++;
}
class Report {
    constructor(
        category,
        customerId,
        description,
        labels,
        owner,
        assignedTo,
        createdAt,
        editedAt,
        closedAt,
        state,
        priority,
        comments,
        closeReason,
        references
    )
    {
        this.id = reportId
        this.category = category
        this.customerId = customerId
        this.description = description
        this.labels = labels
        this.owner = owner
        this.assignedTo = assignedTo
        this.createdAt = createdAt
        this.editedAt = editedAt
        this.closedAt = closedAt
        this.state = state
        this.priority = priority
        this.comments = comments
        this.closeReason = closeReason
        this.references = references
        reportId++
    }
}

const report = new Report(
    "Feedback",
    "ETUR-CN-0",
    "This is a description",
    ["label1", "label2"],
    "Product Manager",
    "Jens Reiner",
    "2020-01-01:12:00:00",
    "2020-01-01:12:00:00",
    "2020-01-01:12:00:00",
    "Open",
    1,
    [
      {
        author: "Jens Reiner",
        message: "This is a comment",
        createdAt: "2020-01-01:12:00:00",
        type: 'developer',
      },
    ],
    "This is a close reason",
    [
      {
        type: "github",
        url: "",
        issueNumber: 1
      }
    ]
);

export const reportArray = [report];