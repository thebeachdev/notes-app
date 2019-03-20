const request = require('supertest')
const app = require('../../../src/')
const Note = require('../../models').Note
const { AuthConstants, ApiRoutes } = require('./constants')
const uuidv4 = require('uuid/v4')
/**
 * Test the Sign End
 */
let agent = null
beforeAll(async () => {
  agent = await request.agent(app)
})
describe('Create Route - POST - api/notes', async () => {
  test(`POST /notes 201 -VALID Note entry.`, async () => {
    const { status, body } = await agent.post(ApiRoutes.NOTES_URL)
    // TODO: come back and re do
    expect(status).toBe(200)
    expect(typeof body).toBe('object')
    expect(typeof body.success).toBe('boolean')
    expect(body.success).toBe(true)
  })
  // TODO: test validation
})
// Simple TEST CRUD and Validation.
