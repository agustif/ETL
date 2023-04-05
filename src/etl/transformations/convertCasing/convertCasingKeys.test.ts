import {
    convertCasingToOptions,
    convertCasingFromOptions,
    convertCasingKeys,
    ConfigOptions,
    ConvertCasingInput,
  } from './convertCasingKeys';
  
    const testData = [
      { first_name: 'John', last_name: 'Doe', age: 30 },
      { first_name: 'Jane', last_name: 'Smith', age: 28 },
    ];
  
    const testDataCamel = [
        { firstName: 'John', lastName: 'Doe', age: 30 },
        { firstName: 'Jane', lastName: 'Smith', age: 28 },
      ];
      
      const testDataPascal = [
        { FirstName: 'John', LastName: 'Doe', Age: 30 },
        { FirstName: 'Jane', LastName: 'Smith', Age: 28 },
      ];
      const testDataNested = [
        { first_name: 'John', last_name: 'Doe', age: 30, address: { street_name: 'Main St', city: 'New York' } },
        { first_name: 'Jane', last_name: 'Smith', age: 28, address: { street_name: 'High St', city: 'Los Angeles' } },
      ];
      
      const testDataWithArray = [
        { first_name: 'John', last_name: 'Doe', age: 30, hobbies: ['reading_books', 'playing_games'] },
        { first_name: 'Jane', last_name: 'Smith', age: 28, hobbies: ['painting', 'travelling'] },
      ];
      
    const testDataSpecialChars = [
        { 'first_name!': 'John', 'last_name@': 'Doe', 'age#': 30 },
        { 'first_name!': 'Jane', 'last_name@': 'Smith', 'age#': 28 },
    ];
    const testDataMixedCasing = [
        { first_name: 'John', lastName: 'Doe', 'age#': 30 },
        { FirstName: 'Jane', 'last_name': 'Smith', 'age#': 28 },
      ];
      
     
  
  describe('convertCasingKeys', () => {
    // Test data
    // ...
     
    describe('Conversion between different casing styles', () => {
        const testCases: Array<{
            description: string;
            config: ConfigOptions;
            inputData: Array<Record<string, any>>;
            expectedOutput: Array<Record<string, any>>;
          }> = [
          
            {
                description: 'snake_case to camelCase',
                config: {
                  from: convertCasingFromOptions.Snake,
                  to: convertCasingToOptions.Camel,
                },
                inputData: testData,
                expectedOutput: [
                  { firstName: 'John', lastName: 'Doe', age: 30 },
                  { firstName: 'Jane', lastName: 'Smith', age: 28 },
                ],
              },
          // Add more test cases here
          {
            description: 'camelCase to snake_case',
            config: {
              from: convertCasingFromOptions.Camel,
              to: convertCasingToOptions.Snake,
            },
            inputData: testDataCamel,
            expectedOutput: [
              { first_name: 'John', last_name: 'Doe', age: 30 },
              { first_name: 'Jane', last_name: 'Smith', age: 28 },
            ],
          },
          {
            description: 'camelCase to PascalCase',
            config: {
                from: convertCasingFromOptions.Camel,
                to: convertCasingToOptions.Pascal,
            },
            inputData: testDataCamel,
            expectedOutput: testDataPascal,
          },
          {
            description: 'PascalCase to camelCase',
            config: {
                from: convertCasingFromOptions.Pascal,
                to: convertCasingToOptions.Camel,
            },
            inputData: testDataPascal,
            expectedOutput: testDataCamel,
          },
          {
            description: 'PascalCase to snake_case',
            config: {
                from: convertCasingFromOptions.Pascal,
                to: convertCasingToOptions.Snake,
            },
            inputData: testDataPascal,
            expectedOutput: [
              { first_name: 'John', last_name: 'Doe', age: 30 },
              { first_name: 'Jane', last_name: 'Smith', age: 28 },
            ],
          },
        // kebab-case
        {
            description: 'snake_case to kebab-case',
            config: {
              from: convertCasingFromOptions.Snake,
              to: convertCasingToOptions.Kebab,
            },
            inputData: testData,
            expectedOutput: [
              { 'first-name': 'John', 'last-name': 'Doe', age: 30 },
              { 'first-name': 'Jane', 'last-name': 'Smith', age: 28 },
            ],
          },
          {
            description: 'kebab-case to camelCase',
            config: {
              from: convertCasingFromOptions.Kebab,
              to: convertCasingToOptions.Camel,
            },
            inputData: [
              { 'first-name': 'John', 'last-name': 'Doe', age: 30 },
              { 'first-name': 'Jane', 'last-name': 'Smith', age: 28 },
            ],
            expectedOutput: testDataCamel,
          },
          // nested
          {
      description: 'snake_case to camelCase (nested objects)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: testDataNested,
      expectedOutput: [
        { firstName: 'John', lastName: 'Doe', age: 30, address: { streetName: 'Main St', city: 'New York' } },
        { firstName: 'Jane', lastName: 'Smith', age: 28, address: { streetName: 'High St', city: 'Los Angeles' } },
      ],
    },
    // array
    {
        description: 'snake_case to camelCase (arrays inside objects)',
        config: {
          from: convertCasingFromOptions.Snake,
          to: convertCasingToOptions.Camel,
        },
        inputData: testDataWithArray,
        expectedOutput: [
          { firstName: 'John', lastName: 'Doe', age: 30, hobbies: ['readingBooks', 'playingGames'] },
          { firstName: 'Jane', lastName: 'Smith', age: 28, hobbies: ['painting', 'travelling'] },
        ],
      },
      {
        description: 'empty object',
        config: {
          from: convertCasingFromOptions.Snake,
          to: convertCasingToOptions.Camel,
        },
        inputData: [{}],
        expectedOutput: [{}],
      },
    
    
      
      {
        description: 'snake_case to camelCase (special characters in keys)',
        config: {
          from: convertCasingFromOptions.Snake,
          to: convertCasingToOptions.Camel,
        },
        inputData: testDataSpecialChars,
        expectedOutput: [
          { 'firstName!': 'John', 'lastName@': 'Doe', 'age#': 30 },
          { 'firstName!': 'Jane', 'lastName@': 'Smith', 'age#': 28 },
        ],
      },
      
      {
        description: 'mixed casing styles to camelCase',
        config: {
          from: convertCasingFromOptions.Snake, // This is just a placeholder; the input has mixed casing styles
          to: convertCasingToOptions.Camel,
        },
        inputData: testDataMixedCasing,
        expectedOutput: [
            { firstName: 'John', lastName: 'Doe', 'age#': 30 },
            { firstName: 'Jane', lastName: 'Smith', 'age#': 28 },
          ],
      },
    
    //   1.	Test case with nested arrays:
      {
      description: 'snake_case to camelCase (nested arrays)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: [
        { first_name: 'John', last_name: 'Doe', age: 30, hobbies: [['reading_books', 'playing_games'], ['cooking']] },
      ],
      expectedOutput: [
        { firstName: 'John', lastName: 'Doe', age: 30, hobbies: [['readingBooks', 'playingGames'], ['cooking']] },
      ],
    },
    // 1.	Test case with numbers and special characters in key names:
    {
      description: 'snake_case to camelCase (numbers and special characters in keys)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: [
        { 'first_name_1': 'John', 'last_name#': 'Doe', 'age_2': 30 },
        { 'first_name_1': 'Jane', 'last_name#': 'Smith', 'age_2': 28 },
      ],
      expectedOutput: [
        { 'firstName1': 'John', 'lastName#': 'Doe', 'age2': 30 },
        { 'firstName1': 'Jane', 'lastName#': 'Smith', 'age2': 28 },
      ],
    },
    // 1.	Test case with non-string values as keys:
    {
      description: 'snake_case to camelCase (non-string keys)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: [
        { first_name: 'John', last_name: 'Doe', 30: 'age' },
      ],
      expectedOutput: [
        { firstName: 'John', lastName: 'Doe', 30: 'age' },
      ],
    },
    // 1.	Test case with empty strings as keys:
    {
      description: 'snake_case to camelCase (empty string keys)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: [
        { first_name: 'John', last_name: 'Doe', '': 'empty' },
      ],
      expectedOutput: [
        { firstName: 'John', lastName: 'Doe', '': 'empty' },
      ],
    },
    // 1.	Test case with null and undefined values:
    {
      description: 'snake_case to camelCase (null and undefined values)',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.Camel,
      },
      inputData: [
        { first_name: 'John', last_name: 'Doe', age: null, address: undefined },
      ],
      expectedOutput: [
        { firstName: 'John', lastName: 'Doe', age: null, address: undefined },
      ],
    },
    // 1.	Test case for snake_case to HungarianCamel:
    {
      description: 'snake_case to HungarianCamel',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.HungarianCamel,
      },
      inputData: [
        { str_first_name: 'John', int_age: 30 },
        { str_first_name: 'Jane', int_age: 28 },
      ],
      expectedOutput: [
        { strFirstName: 'John', intAge: 30 },
        { strFirstName: 'Jane', intAge: 28 },
      ],
    },
    
    // 1.	Test case for snake_case to HungarianPascal:
    {
      description: 'snake_case to HungarianPascal',
      config: {
        from: convertCasingFromOptions.Snake,
        to: convertCasingToOptions.HungarianPascal,
      },
      inputData: [
        { str_first_name: 'John', int_age: 30 },
        { str_first_name: 'Jane', int_age: 28 },
      ],
      expectedOutput: [
        { StrFirstName: 'John', IntAge: 30 },
        { StrFirstName: 'Jane', IntAge: 28 },
      ],
    },
    
    // 1.	Test case for HungarianCamel to HungarianPascal:
    {
      description: 'HungarianCamel to HungarianPascal',
      config: {
        from: convertCasingFromOptions.HungarianCamel,
        to: convertCasingToOptions.HungarianPascal,
      },
      inputData: [
        { strFirstName: 'John', intAge: 30 },
        { strFirstName: 'Jane', intAge: 28 },
      ],
      expectedOutput: [
        { StrFirstName: 'John', IntAge: 30 },
        { StrFirstName: 'Jane', IntAge: 28 },
      ],
    },
    
    // END OF TEST CASES
        ];
    
  
      testCases.forEach(({ description, config, inputData, expectedOutput }) => {
        it(description, () => {
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
  
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      });
    });
  
    describe('Handling invalid inputs', () => {
      it('should return an empty array when options are missing or incomplete', () => {
        const missingOptions: any[] = [null, undefined, {}, { config: {} }, { data: [] }];
        missingOptions.forEach((options) => {
          expect(convertCasingKeys(options)).toEqual([]);
        });
      });
  
      it('should return input data unchanged when conversion is unsupported', () => {
        const unsupportedConfig: ConfigOptions = {
          from: "Camel", // Unsupported conversion
          to: "Pascal",
        };
  
        const input: ConvertCasingInput<typeof testData[0]> = {
          config: unsupportedConfig,
          data: testData,
        };
  
        const result = convertCasingKeys(input);
        expect(result).toEqual(testData);
      });
    });
  
    describe('Edge cases', () => {
        // Test case with empty string keys
        it('should handle empty string keys', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', '': 'empty' },
          ];
          const expectedOutput = [
            { firstName: 'John', lastName: 'Doe', '': 'empty' },
          ];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with null values
        it('should handle null values', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', age: null },
          ];
          const expectedOutput = [
            { firstName: 'John', lastName: 'Doe', age: null },
          ];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with undefined values
        it('should handle undefined values', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', age: undefined },
          ];
          const expectedOutput = [
            { firstName: 'John', lastName: 'Doe', age: undefined },
          ];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with non-string keys (e.g., numbers)
        it('should ignore non-string keys', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', 30: 'age' },
          ];
          const expectedOutput = [
            { firstName: 'John', lastName: 'Doe', 30: 'age' },
          ];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with an empty object
        it('should handle empty objects', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData = [{}];
          const expectedOutput = [{}];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with an empty array
        it('should handle empty arrays', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: convertCasingToOptions.Camel,
          };
          const inputData: Array<Record<string, any>> = [];
          const expectedOutput: Array<Record<string, any>> = [];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      });

      describe('Invalid inputs', () => {
        // Test case with an invalid 'from' value
        it('should return input data unchanged when given an invalid "from" value', () => {
          const config: ConfigOptions = {
            from: 'InvalidFrom' as any, // Invalid 'from' value
            to: convertCasingToOptions.Camel,
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', age: 30 },
          ];
          const expectedOutput = [...inputData];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with an invalid 'to' value
        it('should return input data unchanged when given an invalid "to" value', () => {
          const config: ConfigOptions = {
            from: convertCasingFromOptions.Snake,
            to: 'InvalidTo' as any, // Invalid 'to' value
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', age: 30 },
          ];
          const expectedOutput = [...inputData];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      
        // Test case with both 'from' and 'to' values being invalid
        it('should return input data unchanged when given both invalid "from" and "to" values', () => {
          const config: ConfigOptions = {
            from: 'InvalidFrom' as any, // Invalid 'from' value
            to: 'InvalidTo' as any, // Invalid 'to' value
          };
          const inputData = [
            { first_name: 'John', last_name: 'Doe', age: 30 },
          ];
          const expectedOutput = [...inputData];
      
          const input: ConvertCasingInput<typeof inputData[0]> = {
            config,
            data: inputData,
          };
      
          const result = convertCasingKeys(input);
          expect(result).toEqual(expectedOutput);
        });
      });
      describe('Handling unknown "from" values', () => {
        // Test case with an unknown 'from' value and known 'to' value
        // it('should convert keys when given an unknown "from" value and a known "to" value', () => {
        //   const config: ConfigOptions = {
        //     from: 'UnknownFrom' as any, // Unknown 'from' value
        //     to: convertCasingToOptions.Snake,
        //   };
        //   const inputData = [
        //     { first_name: 'John', last_name: 'Doe', age: 30 }, // SnakeCase input
        //   ];
        //   const expectedOutput  = [
        //     { firstName: 'John', lastName: 'Doe', age: 30 },
        //   ];
      
        //   const input: ConvertCasingInput<typeof inputData[0]> = {
        //     config,
        //     data: inputData,
        //   };
      
        //   const result = convertCasingKeys(input);
        //   expect(result).toEqual(expectedOutput);
        // });
      
    //     // Test case with a missing 'from' value and known 'to' value
    //     it('should convert keys when given a missing "from" value and a known "to" value', () => {
    //       const config: ConfigOptions = {
    //         from: undefined, // Missing 'from' value
    //         to: convertCasingToOptions.Snake,
    //       };
    //       const inputData = [
    //         { first_name: 'John', last_name: 'Doe', age: 30 }, // SnakeCase input
    //       ];
    //       const expectedOutput = [
    //         { firstName: 'John', lastName: 'Doe', age: 30 },
    //       ];
      
    //       const input: ConvertCasingInput<typeof inputData[0]> = {
    //         config,
    //         data: inputData,
    //       };
      
    //       const result = convertCasingKeys(input);
    //       expect(result).toEqual(expectedOutput);
    //     });
      });
      
      
  });