import fetch from 'node-fetch'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { deserialize } from 'bson'
import { encode, decode } from '@msgpack/msgpack';
import { SampleData } from './sample_pb'

describe('handlers', () => {
  const server = setupServer(...handlers)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should return JSON data', async () => {
    const response = await fetch('https://api.example.com/data-json')
    const data = await response.json()
    expect(data).toEqual([{ key: 'value' }])
  })

  it('should return XML data', async () => {
    const response = await fetch('https://api.example.com/data-xml')
    const data = await response.text()
    expect(data).toEqual('<root><item><key>value</key></item></root>')
  })

  it('should return plain text data', async () => {
    const response = await fetch('https://api.example.com/data-plain')
    const data = await response.text()
    expect(data).toEqual('Hello, world!')
  })

  it('should return CSV data', async () => {
    const response = await fetch('https://api.example.com/data-csv')
    const data = await response.text()
    expect(data).toEqual('key,value\na,b')
  })

  it('should retry fetching CSV data when it fails', async () => {
    const response = await fetch('https://api.example.com/data-csv-retry')
    const data = await response.text()
    expect(data).toEqual('key,value\na,b')
  })

  it('should return YAML data', async () => {
    const response = await fetch('https://api.example.com/data-yaml')
    const data = await response.text()
    expect(data).toEqual('key: value')
  })

  it('should retry fetching YAML data when it fails', async () => {
    const response = await fetch('https://api.example.com/data-yaml-retry')
    const data = await response.text()
    expect(data).toEqual('key: value')
  })

  it('should return BSON data', async () => {
    const response = await fetch('https://api.example.com/data-bson')
    const data = await response.arrayBuffer()
    const deserializedData = deserialize(new Uint8Array(data))
    expect(deserializedData).toEqual({ key: 'value' })
  })

  it('should return Protobuf data', async () => {
    const response = await fetch('https://api.example.com/data-protobuf')
    const data = await response.arrayBuffer()
    const deserializedData = SampleData.deserializeBinary(new Uint8Array(data))
    expect(deserializedData.getKey()).toEqual('key')
    expect(deserializedData.getValue()).toEqual('value')
  })


  it('should return BSON data', async () => {
    const response = await fetch('https://api.example.com/data-bson')
    const data = await response.arrayBuffer()
    const deserializedData = deserialize(new Uint8Array(data))
    expect(deserializedData).toEqual({ key: 'value' })
  })
  
  it('should return Protobuf data', async () => {
    const response = await fetch('https://api.example.com/data-protobuf')
    const data = await response.arrayBuffer()
    const deserializedData = SampleData.deserializeBinary(new Uint8Array(data))
    expect(deserializedData.getKey()).toEqual('key')
    expect(deserializedData.getValue()).toEqual('value')
  })

  it('should return MsgPack data', async () => {
    const response = await fetch('https://api.example.com/data-msgpack')
    const data = await response.arrayBuffer()
    console.log('data:', data)
    const deserializedData = decode(new Uint8Array(data))
    console.log('deserializedData:', deserializedData)
  
    expect(deserializedData).toEqual([{ key: 'value' }])
  })
  
  it('should retry fetching XML data when it fails', async () => {
    const response = await fetch('https://api.example.com/data-xml-retry')
    const data = await response.text()
    expect(data).toEqual('<root><item><key>value</key></item></root>')
  })
  
  it('should handle errors when fetching plain text data', async () => {
    try {
      await fetch('https://api.example.com/data-plain-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should retry fetching CSV data 3 times when it fails', async () => {
    const response = await fetch('https://api.example.com/data-csv-retry')
    const data = await response.text()
    expect(data).toEqual('key,value\na,b')
  })
  
  it('should retry fetching YAML data 3 times when it fails', async () => {
    const response = await fetch('https://api.example.com/data-yaml-retry')
    const data = await response.text()
    expect(data).toEqual('key: value')
  })

  it('should retry fetching XML data 3 times when it fails', async () =>
  {
    const response = await fetch('https://api.example.com/data-xml-retry')
    const data = await response.text()
    expect(data).toEqual('<root><item><key>value</key></item></root>')
  })
  
  it('should handle errors when fetching CSV data', async () => {
    try {
      await fetch('https://api.example.com/data-csv-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should handle errors when fetching YAML data', async () => {
    try {
      await fetch('https://api.example.com/data-yaml-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should handle errors when fetching XML data', async () => {
    try {
      await fetch('https://api.example.com/data-xml-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should handle errors when fetching BSON data', async () => {
    try {
      await fetch('https://api.example.com/data-bson-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should handle errors when fetching Protobuf data', async () => {
    try {
      await fetch('https://api.example.com/data-protobuf-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
  
  it('should handle errors when fetching MsgPack data', async () => {
    try {
      await fetch('https://api.example.com/data-msgpack-error')
    } catch (error) {
      expect(error).toEqual(new Error('Internal Server Error'))
    }
  })
})
  // Add more test cases for each request handler in the handlers array