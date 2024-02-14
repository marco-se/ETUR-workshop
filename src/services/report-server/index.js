import {
  GetAllCustomerReports, CreateCustomerReport,
  GetAllDeveloperReports, EditReportAsDeveloper,
  GetAllReports, EditReportAsManager,
  CreateReport, UpdateReportDescription,
  UpdateReportAssignedTo, UpdateReportComment,
  UpdateReportReference, UpdateReportCloseReason,
  UpdateReportPriority, UpdateReportLabel,
  UpdateReportState
} from './api-functions.js';
import Fastify from 'fastify'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})
fastify.register(cors, {
  origin: '*'
});

const customerGetSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            label: { type: 'array' },
            state: { type: 'string' },
            closeReason: { type: 'string' },
            comments: { type: 'array' },
          }
        }
      }
    }
  }
}
//Get all reports for a customer
fastify.get('/customer/:id/reports', customerGetSchema, async function handler(request, reply) {
  return GetAllCustomerReports(request.params.id)
})

const customerPostSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        customerId: { type: 'string' },
        category: { type: 'string' },
        description: { type: 'string' },
        label: { type: 'string'}
      },
      required: ['customerId', 'category', 'description']
    },
  }
}
//Customer defines a report
fastify.post('/customer/report', customerPostSchema, async function handler(request, reply) {
  return CreateCustomerReport(request.body.category, request.body.customerId, request.body.description, request.body.label)
})

//Get all reports for a developer
fastify.get('/developer/:name/reports', async function handler(request, reply) {
  return GetAllDeveloperReports(request.params.name)
})

const developerPostSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        closeReason: { type: 'string' },
        comment: {
          type: 'object',
          properties: {
            author: { type: 'string' },
            message: { type: 'string' },
          }
        }
      },
      required: ['id', 'closeReason']
    },
  }
}
//Edit a report as a developer
fastify.patch('/developer/:name/report', developerPostSchema, async function handler(request, reply) {
  return EditReportAsDeveloper(request.params.name, request.body.id, request.body.closeReason, request.body.comment)
})

//Get all reports for a product manager
fastify.get('/manager/reports', async function handler(request, reply) {
  return GetAllReports()
})

const managerPostSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        assignedTo: { type: 'string' },
        priority: { type: 'string' },
        comment: {
          type: 'object',
          properties: {
            author: { type: 'string' },
            message: { type: 'string' },
          }
        },
        reference: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            url: { type: 'string' },
            issueNumber: { type: 'number' }
          }
        }
      },
      required: ['id', 'assignedTo', 'priority']
    },
  }
}

//Edit a report as a product manager
fastify.patch('/manager/report', managerPostSchema, async function handler(request, reply) {
  return EditReportAsManager(request.body.id, request.body.assignedTo, request.body.priority, request.body.comment, request.body.reference)
})

const createSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        customerId: { type: 'string' }
      },
      required: ['category', 'customerId']
    }
  }
}
//Creates a report with a category and customerId
fastify.post('/report/create', createSchema, async function handler(request, reply) {
  return CreateReport(request.body.category, request.body.customerId)
})

const updateDescriptionSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        description: { type: 'string' }
      },
      required: ['id', 'description']
    }
  }
}
//Updates the description of a report
fastify.patch('/report/description', updateDescriptionSchema, async function handler(request, reply) {
  return UpdateReportDescription(request.body.id, request.body.description)
})

const updateLabelSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        label: { type: 'string' }
      },
      required: ['id', 'label']
    }
  }
}
//Updates the label of a report
fastify.patch('/report/label', updateLabelSchema, async function handler(request, reply) {
  return UpdateReportLabel(request.body.id, request.body.label)
})

const updateAssignedToSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        assignedTo: { type: 'string' }
      },
      required: ['id', 'assignedTo']
    }
  }
}
//Updates the assignedTo of a report
fastify.patch('/report/assignedTo', updateAssignedToSchema, async function handler(request, reply) {
  return UpdateReportAssignedTo(request.body.id, request.body.assignedTo)
})

const updateStateSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        state: { type: 'string' }
      },
      required: ['id', 'state']
    }
  }
}
//Updates the state of a report
fastify.patch('/report/state', updateStateSchema, async function handler(request, reply) {
  return UpdateReportState(request.body.id, request.body.state)
})

const updatePrioritySchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        priority: { type: 'number' }
      },
      required: ['id', 'priority']
    }
  }
}
//Updates the priority of a report
fastify.patch('/report/priority', updatePrioritySchema, async function handler(request, reply) {
  return UpdateReportPriority(request.body.id, request.body.priority)
})

const updateCommentSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        comment: { 
          type: 'object',
          properties: {
            author: { type: 'string' },
            message: { type: 'string' },
            type: { type: 'string' }
          },
          required: ['author', 'message', 'type']
        }
      },
      required: ['id', 'comment']
    }
  }
}
//Updates the comment of a report
fastify.patch('/report/comment', updateCommentSchema, async function handler(request, reply) {
  return UpdateReportComment(request.body.id, request.body.comment)
})

const updateCloseReasonSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        closeReason: { type: 'string' }
      },
      required: ['id', 'closeReason']
    }
  }
}
//Updates the close reason of a report
fastify.patch('/report/closeReason', updateCloseReasonSchema, async function handler(request, reply) {
  return UpdateReportCloseReason(request.body.id, request.body.closeReason)
})

const updateReferenceSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        reference: { 
          type: 'object',
          properties: {
            type: { type: 'string' },
            url: { type: 'string' },
            issueNumber: { type: 'string' }
          },
          required: ['type', 'url', 'issueNumber']
        }
      },
      required: ['id', 'reference']
    }
  }
}
//Updates the reference of a report
fastify.patch('/report/reference', updateReferenceSchema, async function handler(request, reply) {
  return UpdateReportReference(request.body.id, request.body.reference)
})

// Run the server!
try {
  await fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}