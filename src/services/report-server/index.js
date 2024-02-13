import { GetAllCustomerReports, CreateCustomerReport,
  GetAllDeveloperReports, EditReportAsDeveloper,
  GetAllReports, EditReportAsManager } from './api-functions.js';
import Fastify from 'fastify'
import cors from '@fastify/cors'

const fastify = Fastify({
  logger: true
})
fastify.register(cors, {
  origin: '*'
});

//Get all reports for a customer
fastify.get('/customer/:id/reports', async function handler (request, reply) {
  return GetAllCustomerReports(request.params.id)
})

//Customer defines a report
fastify.post('/customer/report', async function handler (request, reply) {
  return CreateCustomerReport(request.body.category, request.body.customerId, request.body.description)
})

//Get all reports for a developer
fastify.get('/developer/:name/reports', async function handler (request, reply) {
  return GetAllDeveloperReports(request.params.name)
})

//Edit a report as a developer
fastify.post('/developer/:name/report', async function handler (request, reply) {
  return EditReportAsDeveloper(request.params.name, request.body.id, request.body.closeReason)
})

//Get all reports for a product manager
fastify.get('/manager/reports', async function handler (request, reply) {
  return GetAllReports()
})

//Edit a report as a product manager
fastify.post('/manager/report', async function handler (request, reply) {
  return EditReportAsManager(request.body.id, request.body.assignedTo, request.body.priority, request.body.comment)
})

// Run the server!
try {
  await fastify.listen({ port: 3001 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}