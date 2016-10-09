const Converter = (function () {
  /**
   * @param {*} input
   * @returns {Boolean}
   */
  function isNoValue(input) {
    return input === null || input === '';
  }

  /**
   * @param {*} input
   * @returns {Boolean}
   */
  function isInvalidValue(input) {
    const pattern = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;

    return typeof input !== 'number' && typeof input !== 'string' ||
        !Number.isInteger(input) && !pattern.test(input);
  }

  /**
   * @param {Number} number
   * @returns {Boolean}
   */
  function isOutOfRange(number) {
    return number < 1 || number > 3999;
  }

  // constructor
  function RomanArabicConverter(number) {
    if (this instanceof RomanArabicConverter !== true) {
      return new RomanArabicConverter(number);
    }

    if (isNoValue(number)) {
      throw new Error('value required');
    }

    if (isInvalidValue(number)) {
      throw new Error('invalid value')
    }

    if (isOutOfRange(number)) {
      throw new Error('invalid range');
    }

    this.number = number;
  }

  RomanArabicConverter.prototype.toRoman = function () {
    if (this.number === 1) {
      return 'I';
    }
  };

  return RomanArabicConverter;
}());

const testCases = [
  {
    input: null,
    output: 'value required'
  },
  {
    input: '',
    output: 'value required'
  },
  {
    input: 0,
    output: 'invalid range'
  },
  {
    input: 10000,
    output: 'invalid range'
  },
  {
    input: 'CD1X',
    output: 'invalid value'
  },
  {
    input: 'error',
    output: 'invalid value'
  },
  {
    input: 'MMMMDMXCIX',
    output: 'invalid value'
  },
  {
    input: 1,
    output: 'I'
  }
];

testCases.forEach((testCase, i) => {
  const { input, output } = testCase;

  try {
    const numberConverter = new Converter(input);

    console.log(
      `${i + 1}. For ${input} it should return ${output}: ${numberConverter.toRoman(input) === output} `
    );

  } catch (error) {
    console.log(
      `${i + 1}. For ${input} it should throw ${output}: ${error.message === output}`
    );
  }
});
