import { fetchMsgPack } from './fetchMsgPack'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { encode } from '@msgpack/msgpack'

const server = setupServer(
  rest.get('https://api.example.com/data-msgpack', (req, res, ctx) => {
    const testDataMsgPack = [{ key: 'value' }]
    const msgPackData = encode(testDataMsgPack)
    return res(ctx.set('Content-Type', 'application/x-msgpack'), ctx.body(msgPackData))
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())

describe('fetchMsgPack', () => {
  it('should return MsgPack data', async () => {
    const data = await fetchMsgPack('https://api.example.com/data-msgpack', { method: 'GET' })
    expect(data).toEqual([{ key: 'value' }])
  })

  it('should throw an error if the response is not ok', async () => {
    server.use(
      rest.get('https://api.example.com/data-msgpack', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: 'Not found' }))
      }),
    )

    await expect(fetchMsgPack('https://api.example.com/data-msgpack', { method: 'GET' })).rejects.toThrowError(
      'Error fetching MsgPack data: Not Found',
    )
  })
})
