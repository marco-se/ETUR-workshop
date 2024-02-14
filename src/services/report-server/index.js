import {
  GetAllCustomerReports, CreateCustomerReport,
  GetAllDeveloperReports, EditReportAsDeveloper,
  GetAllReports, EditReportAsManager
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

// Run the server!
try {
  await fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}