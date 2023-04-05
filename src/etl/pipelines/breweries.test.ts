import supertest from 'supertest'
import server, { app } from '../../app'
const request = supertest(app)

afterEach(async () => await server.close())

describe('GET /breweries endpoint', () => {
  it('returns 401 Unauthorized without valid token provided', async () => {
    const response = await request.get('/breweries');

    expect(response.status).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })

  it('returns BreweriesPipeline results as JSON when provided valid token', async () => {
    const getToken = await request.post('/token');
    const { token } = getToken.body
    console.log('token:', token)
    const response = await request.get('/breweries')
      .set('Authorization', `Bearer ${token}`)
    // console.log(response)

    expect(response.status).toBe(200)
    expect(response.text).toBeDefined
  })

})

describe('POST /token endpoint', () => {
  it('returns a 404 if using GET instead of POST', async () => {
    const response = await request.get('/token');

    expect(response.status).toBe(404)
    expect(response.text).toContain('Cannot GET /token')
  })
  it('returns a valid token for auth', async () => {
    const response = await request.post('/token');
    const token = response.text
    expect(response.status).toBe(200)
    expect(token).toBeDefined
  })
})
