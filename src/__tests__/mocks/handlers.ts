import { rest } from 'msw'
import { serialize } from 'bson'
import { encode, decode } from '@msgpack/msgpack';
import { SampleData } from './sample_pb'

const testDataMsgPack = [{ key: 'value' }]
// const msgPackInstance = msgpack()
const msgPackData = encode(testDataMsgPack)

export const handlers = [
  rest.get('https://api.example.com/data-json', (req, res, ctx) => {
    const testData = [{ key: 'value' }]
    return res(ctx.json(testData))
  }),

  rest.get('https://api.example.com/data-xml', (req, res, ctx) => {
    const xmlData = '<root><item><key>value</key></item></root>'
    return res(ctx.xml(xmlData))
  }),

  rest.get('https://api.example.com/data-plain', (req, res, ctx) => {
    const plainText = 'Hello, world!'
    return res(ctx.text(plainText))
  }),
  rest.get('https://api.example.com/data-plain-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-csv', (req, res, ctx) => {
    const csvData = 'key,value\na,b'
    return res(ctx.set('Content-Type', 'text/csv'), ctx.text(csvData))
  }),
  // rest.get('https://api.example.com/data-csv-retry', (req, res, ctx) => {
  //   let fetchAttempts = 0

  //   if (fetchAttempts < 3) {
  //     fetchAttempts++
  //     return res(ctx.status(500))
  //   }

  //   const csvData = 'key,value\na,b'
  //   return res(ctx.set('Content-Type', 'text/csv'), ctx.text(csvData))
  // }),

  rest.get('https://api.example.com/data-csv-retry', (req, res, ctx) => {
    const retryCount = req.headers.get('retry-count')
    if (retryCount && parseInt(retryCount) < 3) {
      return res(ctx.status(500))
    } else {
      const csvData = 'key,value\na,b'
      return res(ctx.set('Content-Type', 'text/csv'), ctx.text(csvData))
    }
  }),
  rest.get('https://api.example.com/data-yaml', (req, res, ctx) => {
    const yamlData = 'key: value'
    return res(ctx.set('Content-Type', 'text/yaml'), ctx.body(yamlData))
  }),
  rest.get('https://api.example.com/data-yaml-retry', (req, res, ctx) => {
    if (req.url.toString() === 'https://api.example.com/data-yaml-retry') {
      if (req.headers.get('retry-count') === '1') {
        return res(ctx.status(500))
      } else if (req.headers.get('retry-count') === '2') {
        return res(ctx.status(500))
      } else {
        const yamlData = 'key: value'
        return res(ctx.set('Content-Type', 'text/yaml'), ctx.body(yamlData))
      }
    }
  }),
  // BSON
  rest.get('https://api.example.com/data-bson', (req, res, ctx) => {
    const data = { key: 'value' }
    const buffer = serialize(data)
    console.log(buffer)
    return res(ctx.set('Content-Type', 'application/bson'), ctx.body(buffer.buffer))
  }),

  rest.get('https://api.example.com/data-protobuf', (req, res, ctx) => {
    const testData = new SampleData()
    testData.setKey('key')
    testData.setValue('value')
    const buffer = testData.serializeBinary()
    return res(ctx.set('Content-Type', 'application/octet-stream'), ctx.body(buffer))
  }),

  rest.get('https://api.example.com/data-protobuf-no-message-type', (req, res, ctx) => {
    const testData = new SampleData()
    testData.setKey('key')
    testData.setValue('value')
    const buffer = testData.serializeBinary()
    return res(ctx.set('Content-Type', 'application/octet-stream'), ctx.body(buffer))
  }),

  rest.get('https://api.example.com/data-msgpack', (req, res, ctx) => {
    const testDataMsgPack = [{ key: 'value' }]
    return res(ctx.set('Content-Type', 'application/x-msgpack'), ctx.body(encode(testDataMsgPack)))
  }),


  // rest.get('https://api.example.com/data-msgpack', (req, res, ctx) => {
  //   return res(ctx.set('Content-Type', 'application/x-msgpack'), ctx.body(msgPackData.buffer))
  // }),
  rest.get('https://api.example.com/data-msgpack-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-protobuf-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-bson-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-xml-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-yaml-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  rest.get('https://api.example.com/data-csv-error', (req, res, ctx) => {
    return res(ctx.status(500))
  }),
  // rest.get('https://api.example.com/data-xml-retry', (req, res, ctx) => {
  //   let fetchAttempts = 0

  //   if (fetchAttempts < 3) {
  //     fetchAttempts++
  //     return res(ctx.status(500))
  //   }

  //   const xmlData = '<root><item><key>value</key></item></root>'
  //   return res(ctx.xml(xmlData))
  // }),
  rest.get('https://api.example.com/data-xml-retry', (req, res, ctx) => {
    const xmlData = '<root><item><key>value</key></item></root>'
    return res(ctx.xml(xmlData))
  }),

];
