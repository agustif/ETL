import { rest } from 'msw'
import fetch from 'node-fetch'
import { deserialize } from 'bson';
import { server } from '../../../__tests__/mocks/server'
import { SampleData } from '../../../__tests__/mocks/sample_pb'
import restExtractor, { Format } from './restExtractor';
import msgpack from 'msgpack5'


global.fetch = fetch

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('restExtractor', () => {
  describe('JSON format', () => {
    it('should fetch JSON data', async () => {
      const testData = [{ key: 'value' }]

      const result = await restExtractor({
        endpoint: 'https://api.example.com/data-json',
        format: Format.Json,
      })

      expect(result).toEqual(testData)
    })
    it('should throw an error when fetching JSON data fails', async () => {
      server.use(
        rest.get('https://api.example.com/data-json-fail', (req, res, ctx) => {
          return res(ctx.status(500))
        })
      )
    
      await expect(
        restExtractor({
          endpoint: 'https://api.example.com/data-json-fail',
          format: Format.Json,
        })
      ).rejects.toThrow('Error fetching JSON data')
    })
    
    // Add more JSON format test cases here
  })

  describe('XML format', () => {
    it('should fetch XML data', async () => {
      const result = await restExtractor({
        endpoint: 'https://api.example.com/data-xml',
        format: Format.Xml,
        xmlRootElement: 'item',
        mapXmlData: (data: any) => ({
          key: data.key[0],
        }),
      })

      expect(result).toEqual([{ key: 'value' }])
    })

    it('should retry fetching XML data when it fails', async () => {
      let fetchAttempts = 0

      server.use(
        rest.get('https://api.example.com/data-xml-retry', (req, res, ctx) => {
          if (fetchAttempts < 3) {
            fetchAttempts++
            return res(ctx.status(500))
          }
      
          const xmlData = '<root><item><key>value</key></item></root>'
          return res(ctx.xml(xmlData))
        })
      )

  const result = await restExtractor({
    endpoint: 'https://api.example.com/data-xml-retry',
    format: Format.Xml,
    xmlRootElement: 'item',
    mapXmlData: (data: any) => ({
      key: data.key[0],
    }),
    retries: 3,
  })

  expect(result).toEqual([{ key: 'value' }])
})

    // Add more XML format test cases here
  })

  describe('Plain text format', () => {
    it('should fetch plain text data', async () => {
      const testData = 'Hello, world!'

      const result = await restExtractor({
        endpoint: 'https://api.example.com/data-plain',
        format: Format.Plain,
      })

      expect(result).toEqual([testData])
    })
    it('should throw an error when fetching plain text data fails', async () => {
      await expect(
        restExtractor({
          endpoint: 'https://api.example.com/data-plain-error',
          format: Format.PlainText,
        })
      ).rejects.toThrow()
    })
    
    // Add more plain text format test cases here
  })


describe('CSV format', () => {
  // Add the 'done' callback
  it('should fetch CSV data', async () => {
    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-csv',
      format: Format.Csv,
      mapCsvData: (data: any) => ({
        key: data.key,
      }),
    }).catch((error) => {
      console.log('CSV test error:', error)
    })

    console.log('CSV test result:', result)
    expect(result).toEqual([{ key: "a", value: "b"}])
    
    // Call the 'done' callback to indicate the test is complete
    // done()
  })

  it('should retry fetching CSV data when it fails', async () => {
    let fetchAttempts = 0
  
    server.use(
      rest.get('https://api.example.com/data-csv-retry', (req, res, ctx) => {
        fetchAttempts++
        if (fetchAttempts < 3) {
          return res(ctx.status(500))
        }
        const csvData = 'key,value\na,b'
        return res(ctx.set('Content-Type', 'text/csv'), ctx.body(csvData))
      })
    )
  
    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-csv-retry',
      format: Format.Csv,
      mapCsvData: (data: any) => ({
        key: data.key,
      }),
      retries: 3,
    })
  
    expect(result).toEqual([{ key: 'a', value : 'b' }])
  })

})

describe('BSON format', () => {
  it('should fetch BSON data', async () => {
    const testData = { key: 'value' };

    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-bson',
      format: Format.Bson,
    });

    expect(result).toEqual(testData);
  });

  // Add more BSON format test cases here
  it('should throw an error when fetching BSON data fails', async () => {
    server.use(
      rest.get('https://api.example.com/data-bson-fail', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
  
    await expect(
      restExtractor({
        endpoint: 'https://api.example.com/data-bson-fail',
        format: Format.Bson,
      })
    ).rejects.toThrow('Error fetching BSON data')
  })
  
});

describe('Protobuf format', () => {


  it('should fetch Protobuf data', async () => {
    const testData = new SampleData()
    testData.setKey('key')
    testData.setValue('value')
  
    const result = await restExtractor<SampleData>({
      endpoint: 'https://api.example.com/data-protobuf',
      format: Format.Protobuf,
      messageType: SampleData,
    })
  
    console.log('Result:', result)
    console.log('Expected Test Data:', testData.toObject())
  
    expect(result.getKey()).toEqual(testData.getKey())
    expect(result.getValue()).toEqual(testData.getValue())
  })
  // 1.	Test for handling unsuccessful fetch:
  it('should throw an error when fetching Protobuf data fails', async () => {
  server.use(
    rest.get('https://api.example.com/data-protobuf-fail', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  await expect(
    restExtractor<SampleData>({
      endpoint: 'https://api.example.com/data-protobuf-fail',
      format: Format.Protobuf,
      messageType: SampleData,
    })
  ).rejects.toThrow('Error fetching Protobuf data')
})
// 1.	Test for retrying on fetch failure:
it('should retry fetching Protobuf data when it fails', async () => {
  let fetchAttempts = 0

  server.use(
    rest.get('https://api.example.com/data-protobuf-retry', (req, res, ctx) => {
      fetchAttempts++
      if (fetchAttempts < 3) {
        return res(ctx.status(500))
      }
      const testData = new SampleData()
      testData.setKey('key')
      testData.setValue('value')
      const buffer = testData.serializeBinary()
      return res(ctx.set('Content-Type', 'application/octet-stream'), ctx.body(buffer))
    })
  )

  const result = await restExtractor<SampleData>({
    endpoint: 'https://api.example.com/data-protobuf-retry',
    format: Format.Protobuf,
    messageType: SampleData,
    retries: 3,
  })

  expect(result.getKey()).toEqual('key')
  expect(result.getValue()).toEqual('value')
})

// 1.	Test for custom headers:
it('should send custom headers when fetching Protobuf data', async () => {
  server.use(
    rest.get('https://api.example.com/data-protobuf-headers', (req, res, ctx) => {
      const testData = new SampleData()
      testData.setKey('key')
      testData.setValue('value')
      const buffer = testData.serializeBinary()

      expect(req.headers.get('custom-header')).toEqual('custom-value')

      return res(ctx.set('Content-Type', 'application/octet-stream'), ctx.body(buffer))
    })
  )

  const result = await restExtractor<SampleData>({
    endpoint: 'https://api.example.com/data-protobuf-headers',
    format: Format.Protobuf,
    messageType: SampleData,
    headers: {
      'custom-header': 'custom-value',
    },
  })

  expect(result.getKey()).toEqual('key')
  expect(result.getValue()).toEqual('value')
})

// 1.	Test the case when an unsupported format is provided:
it('should throw an error when an unsupported format is provided', async () => {
  await expect(
    restExtractor({
      endpoint: 'https://api.example.com/data-unsupported-format',
      format: 'UNSUPPORTED_FORMAT' as any,
    })
  ).rejects.toThrow('You must provide a format option in restExtractor')
})

// 1.	Test the case when the  messageType  option is not provided for the Protobuf format:
it('should throw an error when messageType option is not provided for Protobuf format', async () => {
  await expect(
    restExtractor({
      endpoint: 'https://api.example.com/data-protobuf-no-message-type',
      format: Format.Protobuf,
    })
  ).rejects.toThrow('You must provide a messageType option for Protobuf in restExtractor')
})
// 1.	Test for retrying on fetch failure in Protobuf format:
it('should retry fetching Protobuf data when it fails', async () => {
  let fetchAttempts = 0

  server.use(
    rest.get('https://api.example.com/data-protobuf-retry', (req, res, ctx) => {
      fetchAttempts++
      if (fetchAttempts < 3) {
        return res(ctx.status(500))
      }
      const testData = new SampleData()
      testData.setKey('key')
      testData.setValue('value')
      const buffer = testData.serializeBinary()
      return res(ctx.set('Content-Type', 'application/octet-stream'), ctx.body(buffer))
    })
  )

  const result = await restExtractor<SampleData>({
    endpoint: 'https://api.example.com/data-protobuf-retry',
    format: Format.Protobuf,
    messageType: SampleData,
    retries: 3,
  })

  expect(result.getKey()).toEqual('key')
  expect(result.getValue()).toEqual('value')
})

// end preotobuf
})


describe('MsgPack format', () => {
  it('should fetch MsgPack data', async () => {
    const testData = [{ key: 'value' }]

    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-msgpack',
      format: Format.MsgPack,
    })

    console.log('Received data:', result)
    // FIXME: MskPack implementation returns integers, like 12 in this case
    expect(result).toEqual(testData)
  })
it('should throw an error when fetching MsgPack data fails', async () => {
  server.use(
    rest.get('https://api.example.com/data-msgpack-fail', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  await expect(
    restExtractor({
      endpoint: 'https://api.example.com/data-msgpack-fail',
      format: Format.MsgPack,
    })
  ).rejects.toThrow('Error fetching MsgPack data')
})
  // Add more MsgPack format test cases here
})

describe('YAML format', () => {
  it('should fetch YAML data', async () => {
    const testData = { key: 'value' }

    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-yaml',
      format: Format.Yaml,
    })

    expect(result).toEqual(testData)
  })

  it('should retry fetching YAML data when it fails', async () => {
    let fetchAttempts = 0

    server.use(
      rest.get('https://api.example.com/data-yaml-retry', (req, res, ctx) => {
        fetchAttempts++
        if (fetchAttempts < 3) {
          return res(ctx.status(500))
        }
        const yamlData = 'key: value'
        return res(ctx.set('Content-Type', 'text/yaml'), ctx.body(yamlData))
      })
    )

    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-yaml-retry',
      format: Format.Yaml,
      retries: 3,
    })

    expect(result).toEqual({ key: 'value' })
  })
  it('should retry fetching YAML data when it fails', async () => {
    let fetchAttempts = 0
  
    server.use(
      rest.get('https://api.example.com/data-yaml-retry', (req, res, ctx) => {
        fetchAttempts++
        if (fetchAttempts < 3) {
          return res(ctx.status(500))
        }
        const yamlData = 'key: value'
        return res(ctx.set('Content-Type', 'text/yaml'), ctx.body(yamlData))
      })
    )
  
    const result = await restExtractor({
      endpoint: 'https://api.example.com/data-yaml-retry',
      format: Format.Yaml,
      retries: 3,
    })
  
    expect(result).toEqual({ key: 'value' })
  })
  // Add more YAML format test cases here
})


});
