import { GetAllCustomers, CreateCustomer, GetCustomer, RemoveCustomer, ValidateCustomerNumber } from "./customer.js";
/*
const message = "Hello World";
console.log(message);
console.log("Created:", CreateCustomer("Tom", "tom@example.com", "1234567890"))
console.log("Created:", CreateCustomer("Otto", "otto@example.com", "2345678901"))
const index = Math.round(Math.random() * 2)
console.log("Removed:", RemoveCustomer("ETUR-CN-" + index));
console.log("All:", GetAllCustomer());
*/
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
const customerInputOutputSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
        },
        required: ['name', 'email', 'phone']
      },
      response: {
        200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
            }
        }
      }
    }
}
const customerOutputSchema = {
    schema: {
      response: {
        200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
            }
        }
      }
    }
}
const customersOutputSchema = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
            }
          }
        }
      }
    }
}

// Get all customers
fastify.get('/', customersOutputSchema, async function handler (request, reply) {
  return GetAllCustomers()
})
//Get all customers
fastify.get('/customers', customersOutputSchema, async function handler (request, reply) {
    return GetAllCustomers()
})
//Get a customer by id
fastify.get('/customers/:id', customerOutputSchema, async function handler (request, reply) {
    return GetCustomer(request.params.id)
})
//Create a customer
fastify.post('/customers', customerInputOutputSchema, async function handler (request, reply) {
    return CreateCustomer(request.body.name, request.body.email, request.body.phone)
})
//Remove a customer
fastify.delete('/customers/:id', customersOutputSchema, async function handler (request, reply) {
    return RemoveCustomer(request.params.id)
})
//Validate a customer number
fastify.get('/validate/:id', async function handler (request, reply) {
    return ValidateCustomerNumber(request.params.id)
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}