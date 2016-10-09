const Converter = (function () {
  const romanToArabicNumbers = { I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50,
    XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000 };
  const arabicToRomanNumbers = Object.keys(romanToArabicNumbers)
    .reduce((obj, key) => Object.assign({}, obj, { [romanToArabicNumbers[key]]: key }), {});

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
    const number = this.number;

    return number > 3 ? arabicToRomanNumbers[number] : new Array(number).fill(arabicToRomanNumbers[1]).join('');
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
  },
  {
    input: 3,
    output: 'III'
  },
  {
    input: 4,
    output: 'IV'
  },
  {
    input: 5,
    output: 'V'
  },
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
